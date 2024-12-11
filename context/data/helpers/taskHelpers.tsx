import { UserData, Task, createTask } from "@/constants/userData"
import { Dispatch } from "react";

export function doGetTasksByStoryId(data: UserData, storyId: string) {
    const taskIds = data.stories.byId[storyId].taskIds
    const allTasks = Object.values(data.tasks.byId)

    return allTasks.filter(task => taskIds.includes(task.id))
}
export function dispatchAddTask(data: UserData, dispatch: Dispatch<any>, storyId: string) {
    const newTask = createTask()

    data.stories.byId[storyId].taskIds.push(newTask.id)

    data.tasks.byId[newTask.id] = newTask
    data.tasks.allIds.push(newTask.id)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })

}
export function dispatchDeleteTask(data: UserData, dispatch: Dispatch<any>, storyId: string, taskId: string) {

    data.stories.byId[storyId].taskIds = data.stories.byId[storyId].taskIds.filter(id => id != taskId)

    delete data.tasks.byId[taskId]
    data.tasks.allIds = data.tasks.allIds.filter(id => id != taskId)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}
export function dispatchUpdateTask(data: UserData, dispatch: Dispatch<any>, task: Task) {
    data.tasks.byId[task.id] = task

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}