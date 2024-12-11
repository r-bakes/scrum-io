'use client'
import { useState} from 'react'

import { Project, Sprint } from "@/constants/userData"

import { useDataContext } from '@/context/data/dataContext'
import Header from '@/components/core/projects/sprintsPage/header/header'
import ViewSelection from '@/components/core/projects/sprintsPage/header/selectors/viewSelection'
import StoryTable from '@/components/core/projects/sprintsPage/storyTable/storyTable'


export default function Layout() {

    const { getProjects, getSprintsByProjectId } = useDataContext()
    const [selectedView, setSelectedView] = useState("Sprints")

    const projects : Project[] = getProjects()
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]); 

    const sprints : Sprint[] = getSprintsByProjectId(selectedProject.id)
    const [selectedSprint, setSelectedSprint] = useState<Sprint>(sprints[0]); 

    return (
        <div className='flex items-stretch w-full'>
            <ViewSelection onClick={setSelectedView}></ViewSelection>
            <div className='px-6 grow flex flex-col h-full'>
                <Header projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} sprints={sprints} selectedSprint={selectedSprint} setSelectedSprint={setSelectedSprint}></Header>
                {selectedView == "Sprints" && selectedSprint != null ? <StoryTable projectId={selectedProject.id} sprintId={selectedSprint.id}></StoryTable> : <div></div>}
            </div>
        </div>
    )
}