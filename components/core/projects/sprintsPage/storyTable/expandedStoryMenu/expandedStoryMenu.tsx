import { Backlog, Story, Sprint, TeamMember, Epic, Statuses } from "@/constants/userData"
import { Tasks } from "./tasks";

const fixedPopupClass = "absolute top-0 left-0 flex w-full h-full bg-gray-400 bg-opacity-40 "
const fixedFormClass = "flex flex-col w-full h-full rounded-md border shadow-lg bg-white px-10 py-8"
const fixedButtonClass = "flex w-10 font-light px-2 py-2 h-10 align-middle hover:bg-gray-100 focus:ring-sky-500 focus:border-sky-500 hover:rounded-md"
const fixedInputClass="font-light rounded-md appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm "
const fixedSelectClass = "px-4 text-gray-800 font-light w-full h-full hover:bg-gray-100 py-2 focus:bg-gray-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xs "
const fixedTextAreaClass="font-light rounded-md appearance-none w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm min-h-[30%] "


export default function ExpandedStoryMenu({
    story,
    sprint,
    options,
    onChange,
    onClose,
    onMoveStoryToBacklog,
    onMoveStoryToSprint
} : {
    story: Story
    sprint: Sprint
    options : {"team" : TeamMember[], "epics": Epic[], "sprints": Sprint[], "statuses": string[], "backlog": Backlog}
    onChange: React.FormEventHandler<HTMLInputElement>
    onClose: React.FormEventHandler<HTMLButtonElement>
    onMoveStoryToBacklog : Function
    onMoveStoryToSprint : Function
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
            onClose(e)
        } else if (field === "acceptance-criteria-field") {
            story.acceptanceCriteria = e.target.value
        }
        onChange(story)
    }

    return (
        <div className={fixedPopupClass}>
            <div className="flex w-full h-full align-middle justify-center px-80 py-10">
                <div className={fixedFormClass}>
                    <div className="flex items-center w-full h-14 border-b border-b-gray-600">
                        <label className="text-xl font-bold text-gray-700">Edit Story</label>
                        <div className="flex grow align-middle justify-end">
                            <button className={fixedButtonClass}>
                                <div className="flex h-full w-full justify-center">
                                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                    </svg>
                                </div>
                            </button>
                            <button className={fixedButtonClass}>
                                <div className="flex h-full w-full justify-center">
                                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                    </svg>
                                </div>
                            </button>
                            <button className={fixedButtonClass} onClick={onClose}>
                                <div className="flex h-full w-full justify-center">
                                    <svg fill="none" stroke="currentColor" width={24} height={24} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                            </button>

                        </div>
                    </div>
                    <div className="flex w-full py-2 h-28">
                        <div className="flex w-full">
                            <div className="flex flex-col w-full pr">
                                <label className="font-extralight text-s py-2">Title</label>
                                <input id="title-field" placeholder="As a user I want..." value={story.title} className={fixedInputClass + "h-12"} onChange={handleStoryUpdate}></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full pt-2 h-64">
                        <div className="flex flex-col pr-10">
                            <div className="flex flex-col w-40">
                                <label className="font-extralight text-xs pt-2 pb-1">Status</label>
                                <select id="status-field" className={fixedSelectClass} onChange={handleStoryUpdate} value={story.status}>
                                    {options.statuses.map((status) => <option key={status} value={status}>{status}</option>)}    
                                </select>
                            </div>
                            <div className="flex flex-col w-40">
                                <label className="font-extralight text-xs pt-2 pb-1">Owner</label>
                                <select id="owner-field" className={fixedSelectClass} onChange={handleStoryUpdate} value={story.ownerId}>
                                    <option key="unassigned" value="">Unassigned</option>
                                    {options.team.map(member => <option key={member.id} value={member.id}>{member.firstName + " " + member.lastName}</option>)}    
                                </select>
                            </div>
                            <div className="flex flex-col w-40">
                                <label className="font-extralight text-xs pt-2 pb-1">Epic</label>
                                <select id="epic-field" className={fixedSelectClass} onChange={handleStoryUpdate} value={story.epicId}>
                                    <option key="no-epic" value="">No Epic</option>
                                    {options.epics.map(epic => <option key={epic.id} value={epic.id}>{epic.title}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col w-40">
                                <label className="font-extralight text-xs pt-2 pb-1">Sprint</label>
                                <select id="sprint-field" className={fixedSelectClass + "text-right"} onChange={handleStoryUpdate} value={sprint.id}>
                                    <option key="backlog" value={options.backlog.id}>Backlog</option>
                                    {options.sprints.map(sprint => <option key={sprint.id} value={sprint.id}>{sprint.sprintNumber}</option> )}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col w-32 pr-10">
                                <label className="font-extralight text-xs py-2">Points</label>
                                <input id="points-field" type="number" min="0" className={fixedInputClass} value={story.points} onChange={handleStoryUpdate}></input>
                        </div>
                        <div className="flex flex-col grow h-full">
                            <label className="font-extralight text-xs py-2">Acceptance Criteria</label>
                            <textarea id="acceptance-criteria-field" placeholder="Add additional information here..." rows={5} className={fixedTextAreaClass} value={story.acceptanceCriteria} onChange={handleStoryUpdate}></textarea>
                                
                        </div>
                    </div>
                    <div className="flex w-full pt-2 pb-4">
                        <Tasks story={story}></Tasks> 
                    </div>
                </div>
            </div>
        </div>
    )
}