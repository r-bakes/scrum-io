import { UserData, createSprint } from "@/constants/userData";
import { Dispatch } from "react";

export function dispatchAddSprint(data: UserData, dispatch: Dispatch<any>, projectId: string) {
    const newSprint = createSprint()
    data.projects.byId[projectId].sprintIds.push(newSprint.id)
    const projectSprintIds = data.projects.byId[projectId].sprintIds
    const projectSprints = Object.values(data.sprints.byId).filter(sprint => projectSprintIds.includes(sprint.id))

    const projectNextSprintNumber = projectSprints.length > 0 ? Math.max(...projectSprints.map(sprint => sprint.sprintNumber)) + 1 : 0
    newSprint.sprintNumber = projectNextSprintNumber

    data.sprints.byId[newSprint.id] = newSprint
    data.sprints.allIds.push(newSprint.id)

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })

    return newSprint.id
}
export function dispatchDeleteSprint(data: UserData, dispatch: Dispatch<any>, projectId: string, sprintId: string) {
    if (data.projects.byId[projectId].sprintIds.length === 1) {
        console.log("Error: cannot delete the last sprint in a project.")
        return false
    }    
    data.projects.byId[projectId].sprintIds = data.projects.byId[projectId].sprintIds.filter((id) => id != sprintId)

    const deletedSprintNumber = data.sprints.byId[sprintId].sprintNumber
    const sprintIdsInProject = data.projects.byId[projectId].sprintIds

    delete data.sprints.byId[sprintId]
    data.sprints.allIds = data.sprints.allIds.filter((id) => id != sprintId)
    
    for (let id of sprintIdsInProject) {
        if (data.sprints.byId[id].sprintNumber > deletedSprintNumber) {
            data.sprints.byId[id].sprintNumber -= 1 
        }
    }

    dispatch({
        type: "setData",
        payload: {
            data: data
        }
    })
}
export function doGetSprintsByProjectId(data: UserData, projectId: string) {

    const sprintIds = data.projects.byId[projectId].sprintIds
    const allSprints = Object.values(data.sprints.byId)

    return allSprints.filter((sprint) => sprintIds.includes(sprint.id))
}
export function doGetSprintNGivenProjectId(data: UserData, projectId: string, sprintNumber: number) {
    const sprints = doGetSprintsByProjectId(data, projectId)

    return sprints.find(sprint => sprint.sprintNumber === sprintNumber)
}
