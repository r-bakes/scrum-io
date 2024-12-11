import { useDataContext } from "@/context/data/dataContext";
import StoryRow from "./storyRow";
import AddButton from "./addButton";
import { Statuses, Story} from "@/constants/userData";
import { useState } from "react";
import ExpandedStoryMenu from "./expandedStoryMenu/expandedStoryMenu";
import GenerateButton from "./generateButton";
import ImportButton from "./importButton";
import StoryTemplateSelectionMenu from "./storyTemplateSelectionMenu/storyTemplateSelectionMenu";
import { StoryTemplate } from "@/constants/templateData";

const fixedTableHeadClass = "px-4 font-extralight "

export default function StoryTable({
    projectId,
    sprintId
} : {
    projectId: string,
    sprintId : string
}) {
    const { addStoryTemplateToSprint, getSprintsByProjectId, getSprintById, getStoriesBySprintId, addStory, deleteStory, duplicateStory, getTeamByProjectId, getEpicsByProjectId, getBacklogByProjectId, updateStory, moveStoryToBacklog, moveStoryToSprint } = useDataContext()
    const [isStoryMenuOpen, setIsStoryMenuOpen] = useState<boolean>(false)
    const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState<boolean>(false)
    const [openStory, setOpenStory] = useState<Story | null>(null)

    const handleOpenStoryMenu = (story: Story) => {
        setIsStoryMenuOpen(true)
        setOpenStory(story)
    }
    const handleCloseStoryMenu = () => {
        setIsStoryMenuOpen(false)
        setOpenStory(null)
    }
    const handleCloseTemplateMenu = () => {
        setIsTemplateMenuOpen(false)
    }
    const handleOpenTemplateMenu = () => {
        setIsTemplateMenuOpen(true)
    }
    const handleAddTemplate = (template: StoryTemplate) => {
        addStoryTemplateToSprint(sprintId, template)
        setIsTemplateMenuOpen(false)
    }
    const handleDelete = (storyId: string) => {
            deleteStory(
                sprintId,
                storyId
            )
    }
    const handleDuplicate = (storyId: string) => {
        duplicateStory(
            sprintId,
            storyId
        )
    }
    const selectionOptions = {
        "team": getTeamByProjectId(projectId),
        "epics": getEpicsByProjectId(projectId),
        "sprints": getSprintsByProjectId(projectId),
        "statuses": Statuses,
        "backlog": getBacklogByProjectId(projectId)
    }


    return (
        <div className="overflow-x-scroll flex flex-col w-full h-full my-4 pb-10">
            {isStoryMenuOpen ? <ExpandedStoryMenu onChange={updateStory} story={openStory} sprint={getSprintById(sprintId)} options={selectionOptions} onClose={handleCloseStoryMenu} onMoveStoryToBacklog={moveStoryToBacklog} onMoveStoryToSprint={moveStoryToSprint}></ExpandedStoryMenu> : <></>}
            {isTemplateMenuOpen ? <StoryTemplateSelectionMenu onClose={handleCloseTemplateMenu} onSelect={handleAddTemplate}> </StoryTemplateSelectionMenu> : <></>}
            <div className="flex flex-col shadow-md min-w-[960px]">
                <table className="table-fixed text-sm w-full border-collapse border rounded-md">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 h-14 text-left">
                            <th className={fixedTableHeadClass + "w-6/12"}>Story</th>
                            <th className={fixedTableHeadClass + "w-1/12"}>Points</th>
                            <th className={fixedTableHeadClass + "w-1/12"}>Status</th>
                            <th className={fixedTableHeadClass + "w-1/12"}>Owner</th> 
                            <th className={fixedTableHeadClass + "w-1/12"}>Epic</th>
                            <th className={fixedTableHeadClass + "w-1/12"}>Sprint</th>
                            <th className={fixedTableHeadClass + "w-1/12"}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getStoriesBySprintId(sprintId).map((story) => <StoryRow 
                            key={story.id} story={story} options={selectionOptions} sprint={getSprintById(sprintId)} onChange={updateStory} onDelete={handleDelete} onCopy={handleDuplicate} onOpen={handleOpenStoryMenu} onMoveStoryToBacklog={moveStoryToBacklog} onMoveStoryToSprint={moveStoryToSprint}></StoryRow>)}
                    </tbody>
                </table>
                <div className="flex">
                    <AddButton onClick={() => addStory(sprintId)}></AddButton>
                    <GenerateButton></GenerateButton>
                    <ImportButton onOpen={handleOpenTemplateMenu}></ImportButton>
                </div>
            </div>
        </div>
    )
}