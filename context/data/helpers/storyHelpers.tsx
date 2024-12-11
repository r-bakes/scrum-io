import { UserData, createStory, Story } from "@/constants/userData";
import { Dispatch } from "react";

export function dispatchAddStory(data: UserData, dispatch: Dispatch<any>, sprintId: string) {
    const newStory = createStory()

    data.sprints.byId[sprintId].storyIds.push(newStory.id)
    
    data.stories.byId[newStory.id] = newStory 
    data.stories.allIds.push(newStory.id)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}
export function dispatchDeleteStory(data: UserData, dispatch: Dispatch<any>, sprintId: string, storyId: string) {

    data.sprints.byId[sprintId].storyIds = data.sprints.byId[sprintId].storyIds.filter((id) => id != storyId)
    
    delete data.stories.byId[storyId]
    data.stories.allIds = data.stories.allIds.filter((id) => id != storyId)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}
export function dispatchDuplicateStory(data: UserData, dispatch: Dispatch<any>, sprintId: string, storyId: string) {
    const newStoryId = createStory().id
    const newStory = structuredClone(data.stories.byId[storyId])
    newStory.id = newStoryId

    data.sprints.byId[sprintId].storyIds.push(newStory.id)
    
    data.stories.byId[newStory.id] = newStory 
    data.stories.allIds.push(newStory.id)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}
export function dispatchMoveStoryToSprint(data: UserData, dispatch: Dispatch<any>, sourceSprintId: string, storyId: string, targetSprintId: string) {

    data.sprints.byId[sourceSprintId].storyIds = data.sprints.byId[sourceSprintId].storyIds.filter((id) => id != storyId)
    data.sprints.byId[targetSprintId].storyIds.push(storyId)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
} 
export function dispatchMoveStoryToBacklog(data: UserData, dispatch: Dispatch<any>, sourceSprintId: string, storyId: string, targetBacklogId: string) {

    data.sprints.byId[sourceSprintId].storyIds = data.sprints.byId[sourceSprintId].storyIds.filter((id) => id != storyId)
    data.backlogs.byId[targetBacklogId].storyIds.push(storyId)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
} 
export function dispatchUpdateStory(data: UserData, dispatch: Dispatch<any>, story: Story) {

    data.stories.byId[story.id] = story

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}
export function doGetStoriesBySprint(data: UserData, sprintId: string) {
    const storyIds = data.sprints.byId[sprintId].storyIds
    const allStories = Object.values(data.stories.byId)

    return allStories.filter(story => storyIds.includes(story.id))
}