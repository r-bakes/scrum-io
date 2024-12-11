import { Story, Sprint, TeamMember, Epic, Statuses, Backlog } from "@/constants/userData"
import ActionButtons from "./actionButtons"
import { useState } from "react"

const fixedInputClass = "px-4 text-gray-800 font-light w-full h-full py-2 focus:bg-gray-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 hover:bg-gray-100 text-sm "
const fixedSelectClass = "px-4 text-gray-800 font-light w-full h-full py-2 focus:bg-gray-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 hover:bg-gray-100 text-sm "

export default function StoryRow({
    story,
    sprint,
    options,
    onChange,
    onGenerate,
    onCopy,
    onDelete,
    onOpen,
    onMoveStoryToBacklog,
    onMoveStoryToSprint
} : {
    story : Story
    sprint : Sprint
    options : {"team" : TeamMember[], "epics": Epic[], "sprints": Sprint[], "statuses": string[], "backlog": Backlog}
    onChange : React.FormEvent<HTMLInputElement>
    onGenerate : React.MouseEventHandler<HTMLButtonElement>
    onCopy : React.MouseEventHandler<HTMLButtonElement>
    onDelete : React.MouseEventHandler<HTMLButtonElement>
    onOpen : React.MouseEventHandler<HTMLButtonElement>
    onMoveStoryToBacklog : React.MouseEventHandler<HTMLButtonElement>
    onMoveStoryToSprint : React.MouseEventHandler<HTMLButtonElement>
}) {    

    const handleStoryUpdate = (e : React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault()
        const field = e.target.id
        if (field === "title-field") {
            story.title = e.target.value
        } else if (field === "points-field") {
            story.points = e.target.value
        } else if (field === "status-field") {            
            story.status = e.target.value
        } else if (field === "owner-field") {
            story.ownerId = e.target.value
        } else if (field === "epic-field") {
            story.epicId = e.target.value
        } else if (field === "sprint-field") {
            if (e.target.value === options.backlog.id) {
                onMoveStoryToBacklog(sprint.id, story.id, e.target.value)
            } else {
                onMoveStoryToSprint(sprint.id, story.id, e.target.value)
            }
        }
        onChange(story)
    }

    return (
        <tr className="h-10 text-left align-middle">
            <td>
                <div className="flex">
                    <button onClick={() => onOpen(story)}>
                        <div className="flex align-middle justify-center px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </button>
                    <input id="title-field" className={fixedInputClass} onChange={handleStoryUpdate} value={story.title}></input>
                </div>
            </td>
            <td>
                <input id="points-field" className={fixedInputClass + "text-right"} type="number" onChange={handleStoryUpdate} min="0" value={story.points}></input>
            </td>
            <td>
                <select id="status-field" className={fixedSelectClass} onChange={handleStoryUpdate} value={story.status}>
                    {options.statuses.map((status) => <option key={status} value={status}>{status}</option>)}    
                </select>
            </td>
            <td>
                <select id="owner-field" className={fixedSelectClass} onChange={handleStoryUpdate} value={story.ownerId}>
                    <option key="unassigned" value="">Unassigned</option>
                    {options.team.map(member => <option key={member.id} value={member.id}>{member.firstName + " " + member.lastName}</option>)}    
                </select>
            </td>
            <td>
                <select id="epic-field" className={fixedSelectClass} onChange={handleStoryUpdate} value={story.epicId}>
                    <option key="no-epic" value="">No Epic</option>
                    {options.epics.map(epic => <option key={epic.id} value={epic.id}>{epic.title}</option>)}
                </select>
            </td>
            <td>
                <select id="sprint-field" className={fixedSelectClass + "text-right"} onChange={handleStoryUpdate} value={sprint.id}>
                    <option key="backlog" value={options.backlog.id}>Backlog</option>
                    {options.sprints.map(sprint => <option key={sprint.id} value={sprint.id}>{sprint.sprintNumber}</option> )}
                </select>
            </td>
            <td className="px-4">
                <ActionButtons id={story.id} onDelete={onDelete} onCopy={onCopy} onGenerate={onGenerate}></ActionButtons>
            </td>
        </tr>
    )
}