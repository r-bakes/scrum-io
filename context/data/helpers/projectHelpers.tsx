import { UserData, createBacklog, createProject, createSprint } from "@/constants/userData";
import { Dispatch } from "react"
import { dispatchAddSprint } from "./sprintHelpers";
import { dispatchAddBacklog } from "./backlogHelpers";

export function dispatchSetProjectName(data: UserData, dispatch: Dispatch<any>, projectId: string, newName: string) {
    const projectNames = Object.entries(data.projects.byId).map(([_, project]) => project.title.toLowerCase())
    if (projectNames.includes(newName.toLowerCase())) {
        console.log("Error: Project name not unique")
        return false
    }

    data.projects.byId[projectId].title = newName
    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
    
}
export function dispatchAddProject(data: UserData, dispatch: Dispatch<any>) {
    const newProject = createProject()

    const projectNames = Object.entries(data.projects.byId).map(([_, project]) => project.title.toLowerCase())
    if (projectNames.includes(newProject.title.toLowerCase())) {
        console.log("Error: Project name not unique")
        return false
    }

    data.projects.byId[newProject.id] = newProject
    data.projects.allIds.push(newProject.id)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
    dispatchAddBacklog(data, dispatch, newProject.id)
    dispatchAddSprint(data, dispatch, newProject.id)

    return newProject.id
}
export function dispatchDeleteProject(data: UserData, dispatch: Dispatch<any>, projectId: string) {
    if (data.projects.allIds.length === 1) {
        console.log("Error: Cannot delete last project.")
        return false
    }

    delete data.projects.byId[projectId]
    data.projects.allIds = data.projects.allIds.filter((id) => id != projectId)
    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}