'use client'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/auth/authContext'
import getData from '@/firebase/firestore/getData'
import saveData from '@/firebase/firestore/saveData'
import { useState, useEffect, useCallback } from 'react'
import { Project, Sprint, TeamMember, Epic, Story, Backlog, Task } from '@/constants/userData'


import { useReducer, createContext, useContext } from "react";
import { initialUserDataState, UserData } from "@/constants/userData";
import { initialTemplatesState, StoryTemplate, Templates } from '@/constants/templateData'
import { dispatchSetProjectName, dispatchAddProject, dispatchDeleteProject } from "./helpers/projectHelpers";
import { dispatchAddSprint, dispatchDeleteSprint, doGetSprintsByProjectId, doGetSprintNGivenProjectId } from "./helpers/sprintHelpers";
import { dispatchAddStory, dispatchUpdateStory, dispatchDeleteStory, dispatchDuplicateStory, dispatchMoveStoryToSprint, doGetStoriesBySprint, dispatchMoveStoryToBacklog } from "./helpers/storyHelpers";
import { doGetTasksByStoryId, dispatchUpdateTask, dispatchAddTask, dispatchDeleteTask } from './helpers/taskHelpers'
import Loading from '@/components/global/loading'
import { dispatchAddStoryTemplateToSprint } from './helpers/templateHelpers'


export const DataContext = createContext<UserDataContext>(null)
export const useDataContext = () => useContext(DataContext)

type Action = {
    type: string
    payload: {
        data: UserData
    } 
}
type UserDataContext = {
    data: UserData
    setData: (userData : UserData) => void
    setProjectName: (projectId: string, newName: string) => void
    addProject: () => string | false
    getProjectById: (projectId: string) => Project 
    deleteProject: (projectId: string) => void
    getProjects: () => Project[]
    addSprint: (projectId: string) => string
    deleteSprint: (projectId: string, sprintId: string ) => void
    getSprintsByProjectId: (projectId: string) => Sprint[]
    getSprintById: (sprintId: string) => Sprint
    getSprintNGivenProjectId: (projectId: string, sprintNumber: number) => Sprint | undefined
    addStory: (sprintId: string) => void
    deleteStory: (sprintId: string, storyId: string) => void
    duplicateStory: (sprintId: string, storyId: string) => void
    moveStoryToSprint: (sourceSprintId: string, storyId: string, targetSprintId: string) => void
    moveStoryToBacklog: (sourceSprintId: string, storyId: string, targetBacklogId: string) => void
    updateStory: (story: Story) => void
    deleteTask: (storyId: string, taskId: string) => void
    addTask: (storyId: string) => string
    updateTask: (task: Task) => void
    getStoriesBySprintId: (sprintId: string) => Story[]
    getTeamByProjectId: (projectId: string) => TeamMember[]
    getEpicsByProjectId: (projectId: string) => Epic[] 
    getBacklogByProjectId: (projectId: string) => Backlog
    getTasksByStoryId: (storyId: string) => Task[]
    getStoryTemplates: () => StoryTemplate[]
    addStoryTemplateToSprint: (sprintId: string, template: StoryTemplate) => void
    save: () => void
}

export const DataContextProvider = ({ children } : { children : React.ReactNode}) => {
    const { user } = useAuthContext()
    const [data, dispatch] = useReducer(dataReducer, initialUserDataState)
    const [templates, setTemplates] = useState<Templates>(initialTemplatesState)
    const [isUserDataLoading, setIsUserDataLoading] = useState(true);
    const [areTemplatesLoading, setAreTemplatesLoading] = useState(true);
    const router = useRouter()

    const getUserData = useCallback(async () => {
        let { result, error } = await getData("users", user.uid)
        if (error) {
            return console.log(error)
        } 
        if (result) {
            setData(result.data())
            setIsUserDataLoading(false)
        }
    }, [])

    const getTemplates = useCallback(async () => {
        let { result, error } = await getData("templates", "stories")
        if (error) {
            return console.log(error)
        } 
        if (result) {
            setTemplates(
                {stories: result.data()}
            )
            setAreTemplatesLoading(false)
        }
    }, [])

    useEffect(() => {
        if (user == null) {
            router.push("/auth/signin")
        } else {
            getUserData().catch(console.error); 
            getTemplates().catch(console.error)    
        }
    }, [user])

    const setProjectName = (projectId: string, newName: string) => {dispatchSetProjectName({...data}, dispatch, projectId, newName)}
    const addProject = () => {
        return dispatchAddProject({...data}, dispatch)
    }
    const deleteProject = (projectId : string) => {dispatchDeleteProject({...data}, dispatch, projectId)}
    
    const addSprint = (projectId: string) => {return dispatchAddSprint({...data}, dispatch, projectId)}
    const deleteSprint = (projectId: string, sprintId: string) => {dispatchDeleteSprint({...data}, dispatch, projectId, sprintId)}

    const addStory = (sprintId: string) => {dispatchAddStory({...data}, dispatch, sprintId)}
    const deleteStory = (sprintId: string, storyId: string) => {dispatchDeleteStory({...data}, dispatch, sprintId, storyId)}
    const duplicateStory = (sprintId: string, storyId: string) => {dispatchDuplicateStory({...data}, dispatch, sprintId, storyId)}
    const moveStoryToSprint = (sourceSprintId: string, storyId: string, targetSprintId: string) => {dispatchMoveStoryToSprint({...data}, dispatch, sourceSprintId, storyId, targetSprintId)}
    const moveStoryToBacklog = (sourceSprintId: string, storyId: string, targetBacklogId: string) => {dispatchMoveStoryToBacklog({...data}, dispatch, sourceSprintId, storyId, targetBacklogId)}
    const updateStory = (story: Story) => {dispatchUpdateStory({...data}, dispatch, story)}

    const addTask = (storyId: string) => {dispatchAddTask({...data}, dispatch, storyId)}
    const deleteTask = (storyId: string, taskId: string) => {dispatchDeleteTask({...data}, dispatch, storyId, taskId)}
    const updateTask = (task: Task) => {dispatchUpdateTask({...data}, dispatch, task)}

    const getProjects = () => {return Object.values(data.projects.byId)}
    const getProjectById = (projectId: string) => {return data.projects.byId[projectId]}

    const getSprintsByProjectId = (projectId: string) => {return doGetSprintsByProjectId({...data}, projectId)}
    const getSprintById = (sprintId: string) => {return data.sprints.byId[sprintId]}
    const getSprintNGivenProjectId = (projectId: string, sprintNumber: number) => {return doGetSprintNGivenProjectId({...data}, projectId, sprintNumber)}

    const getTeamByProjectId = (projectId: string) => {return Object.values(data.team.byId).filter(teamMember => data.projects.byId[projectId].teamMemberIds.includes(teamMember.id))}
    const getEpicsByProjectId = (projectId: string) => {return Object.values(data.epics.byId).filter(epic => data.projects.byId[projectId].epicIds.includes(epic.id))}
    const getBacklogByProjectId = (projectId: string) => {return data.backlogs.byId[data.projects.byId[projectId].backlogId]}
    const getStoriesBySprintId = (sprintId: string) => {return doGetStoriesBySprint({...data}, sprintId)}
    const getTasksByStoryId = (storyId: string) => {return doGetTasksByStoryId({...data}, storyId)}

    const getStoryTemplates = () => {return Object.values(templates.stories.byId)}

    const save = () => {return console.log(saveData("users", user.uid, data))}

    const addStoryTemplateToSprint = (sprintId: string, template: StoryTemplate) => {dispatchAddStoryTemplateToSprint({...data}, dispatch, sprintId, template)}

    const setData = ( userData: UserData) => (dispatch({
        type: "setData",
        payload: {
            data: userData
        }
    }))
    
    const value = {
        data,
        setData,
        setProjectName,
        addProject,
        getProjectById,
        deleteProject,
        getProjects,
        addSprint,
        deleteSprint,
        getSprintsByProjectId,
        getSprintById,
        getSprintNGivenProjectId,
        addStory,
        deleteStory,
        duplicateStory,
        moveStoryToSprint,
        moveStoryToBacklog,
        updateStory,
        addTask,
        deleteTask,
        updateTask,
        getStoriesBySprintId,
        getTeamByProjectId,
        getEpicsByProjectId,
        getBacklogByProjectId,
        getTasksByStoryId,
        getStoryTemplates,
        addStoryTemplateToSprint,
        save,
    }
    return (isUserDataLoading || areTemplatesLoading ? <Loading></Loading> : (
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>)
    )
}

export function dataReducer(data : UserData, action : Action) {
    const { type, payload } = action
    console.log("Data Reducer Called ", type, payload);

    switch (type) {
        case "setData": {            
            return {...payload.data}
        }
        default: {
            throw Error("Unknown action: " + action.type)
        }
    }
}



