import { Backlog, Story, Sprint, TeamMember, Epic, Statuses } from "@/constants/userData"
import { Tasks } from "../expandedStoryMenu/tasks";
import { useDataContext } from "@/context/data/dataContext";
import StoryTemplateRow from "./storyTemplateRow";

const fixedPopupClass = "absolute top-0 left-0 flex w-full h-full bg-gray-400 bg-opacity-40 "
const fixedFormClass = "flex flex-col w-9/12 h-full min-w-[420px] rounded-md border shadow-lg bg-white px-10 py-8"
const fixedButtonClass = "flex w-10 font-light px-2 py-2 h-10 align-middle hover:bg-gray-100 focus:ring-sky-500 focus:border-sky-500 hover:rounded-md"

const fixedTableHeadClass = "px-4 font-extralight "


export default function StoryTemplateSelectionMenu({
    onSelect,
    onClose
} : {
    onSelect : Function
    onClose : Function
}) { 
    const { getStoryTemplates } = useDataContext()

    return (
        <div className={fixedPopupClass}>
            <div className="flex w-full h-full align-middle justify-center px-80 py-10">
                <div className={fixedFormClass}>
                    <div className="flex items-center w-full h-14 border-b border-b-gray-600">
                        <label className="text-xl font-bold text-gray-700">Select a Story Template</label>
                        <div className="flex grow align-middle justify-end">
                            <button className={fixedButtonClass} onClick={onClose}>
                                <div className="flex h-full w-full justify-center">
                                    <svg fill="none" stroke="currentColor" width={24} height={24} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 rounded-md shadow-md min-w-full">
                        <table className="table-fixed text-sm w-full border-collapse border rounded-md">
                            <thead>
                                <tr className="bg-gray-100 text-gray-800 h-14 text-left">
                                    <th className={fixedTableHeadClass}>Title</th>
                                    <th className={fixedTableHeadClass}>Tags</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getStoryTemplates().map(storyTemplate => <StoryTemplateRow onSelect={onSelect} template={storyTemplate}></StoryTemplateRow>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}