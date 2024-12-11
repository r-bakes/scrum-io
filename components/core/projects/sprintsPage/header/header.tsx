'use client'
import DropdownMenu from "./selectors/dropdownMenu/dropdownMenu"
import { useDataContext } from "@/context/data/dataContext"
import { useState } from "react"
import SaveButton from "./buttons/saveButton"
import OptionsButton from "./buttons/optionsButton"
import { Project, Sprint } from "@/constants/userData"
import { doGetSprintsByProjectId } from "@/context/data/helpers/sprintHelpers"
import ExportButton from "./buttons/exportButton"

export default function Header({
    projects,
    selectedProject,
    setSelectedProject,
    sprints,
    selectedSprint,
    setSelectedSprint
} : { 
    projects : Project[]
    selectedProject: Project
    setSelectedProject: React.MouseEvent<HTMLButtonElement>
    sprints: Sprint[]
    selectedSprint: Sprint
    setSelectedSprint: React.MouseEvent<HTMLButtonElement>
}) {
    const { save, getProjects, getSprintById, getProjectById, addProject, addSprint, deleteProject, deleteSprint, getSprintNGivenProjectId } = useDataContext()
    
    const projectOptions = projects.map(project => [project.title, project.id])
    const sprintOptions = sprints.sort((a, b) => a.sprintNumber < b.sprintNumber ? -1 : 1 ).map(sprint => ["sprint " + sprint.sprintNumber, sprint.id])
    
    const handleDeleteProject = (projectId: string) => {
        deleteProject(projectId)
        if (projectId === selectedProject.id) {
            const projects = getProjects()
            setSelectedProject(projects[0])
        }
    }
    const handleDeleteSprint = (sprintId: string) => {
        deleteSprint(selectedProject.id, sprintId)
        if (sprintId === selectedSprint.id) {
            setSelectedSprint(getSprintNGivenProjectId(selectedProject.id, 0))
            
        }
    }
    const handleEditProjectName = () => {
        console.log("edit!");
    }
    const handleSetSelectedProject = (projectId: string) => {
        const selectedProject = projects.find(project => project.id === projectId)
        if (selectedProject) {
            setSelectedProject(selectedProject)
            setSelectedSprint(getSprintNGivenProjectId(selectedProject.id, 0))
        }
    }
    const handleSetSelectedSprint = (sprintId: string) => {
        const selectedSprint = sprints.find(sprint => sprint.id === sprintId)
        setSelectedSprint(selectedSprint)
    }
    const handleAddProject = () => {
        const projectId = addProject()
        if (projectId) {
            setSelectedProject(getProjectById(projectId))
            setSelectedSprint(getSprintNGivenProjectId(projectId, 0))
        }
    }
    const handleAddSprint = () => {
        setSelectedSprint(getSprintById(addSprint(selectedProject.id)))
    }

    return (
        <div className='flex border-b border-gray-600 h-40 pt-6 w-full'>
            <div className="flex flex-col w-full">
                <label className="font-extralight text-s">Project</label>
                <div className="flex w-full">
                    <DropdownMenu size="lg" options={projectOptions} selected={[selectedProject.title, selectedProject.id]} onSelect={handleSetSelectedProject} onEdit={handleEditProjectName} onAdd={handleAddProject} onDelete={handleDeleteProject}></DropdownMenu>
                </div>
                <div className="flex w-full">
                    <DropdownMenu size="sm" options={sprintOptions} selected={["sprint " + selectedSprint.sprintNumber, selectedSprint.id]} onSelect={handleSetSelectedSprint} onAdd={handleAddSprint} onDelete={handleDeleteSprint}></DropdownMenu>
                    <div className="flex">
                        <ExportButton></ExportButton>
                        <SaveButton onClick={save}></SaveButton>
                        <OptionsButton></OptionsButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
