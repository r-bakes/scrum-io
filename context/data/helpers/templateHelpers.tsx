import { StoryTemplate } from "@/constants/templateData"
import { createTask, createStory } from "@/constants/userData"
import { UserData } from "@/constants/userData"
import { Dispatch } from "react"

export function dispatchAddStoryTemplateToSprint(data: UserData, dispatch: Dispatch<any>, sprintId: string, template: StoryTemplate) {
    const newStory = createStory()
    newStory.acceptanceCriteria = template.acceptanceCriteria
    newStory.title = template.title

    data.sprints.byId[sprintId].storyIds.push(newStory.id)

    data.stories.byId[newStory.id] = newStory
    data.stories.allIds.push(newStory.id)
    
    for (let task of template.tasks) {
        const newTask = createTask()
        newTask.title = task
        
        data.stories.byId[newStory.id].taskIds.push(newTask.id)

        data.tasks.byId[newTask.id] = newTask
        data.tasks.allIds.push(newTask.id)
        
        data.stories.byId[newStory.id].taskIds.push(newTask.id)
    }    

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}