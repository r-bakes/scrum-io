import { UserData, createBacklog } from "@/constants/userData";
import { Dispatch } from "react"
import { dispatchAddSprint } from "./sprintHelpers";


export function dispatchAddBacklog(data: UserData, dispatch: Dispatch<any>, projectId: string) {
    const newBacklog = createBacklog()

    data.projects.byId[projectId].backlogId = newBacklog.id

    data.backlogs.byId[newBacklog.id] = newBacklog
    data.backlogs.allIds.push(newBacklog.id)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })

    return newBacklog.id
}