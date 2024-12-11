import {v4 as uuidv4} from 'uuid'
export type ItemLookups<T> = {
    byId: Record<string, T>
    allIds: string[]
}
export type UserData = {
    projects: ItemLookups<Project>
    backlogs: ItemLookups<Backlog>
    sprints: ItemLookups<Sprint>
    stories: ItemLookups<Story>
    tasks: ItemLookups<Task>
    subtasks: ItemLookups<Subtask>
    epics: ItemLookups<Epic>
    team: ItemLookups<TeamMember>
}
export type Project = {
    id: string
    sprintIds: string[]
    backlogId: string
    teamMemberIds: string[]
    epicIds: string[]
    lastUpdate: string
    title: string
}
export type Backlog = {
    id: string
    lastUpdate: string
    storyIds: string[]
}
export type Sprint = {
    id: string
    sprintNumber: number
    storyIds: string[]
    lastUpdate: string    
}
export type Story = {
    id: string
    ownerId: string
    epicId: string
    taskIds: string[]
    lastUpdate: string
    title: string
    points: number
    acceptanceCriteria: string
    status: "To Do" | "In Progress" | "In Review" | "Complete" 
}
export type Task = {
    id: string
    subtaskIds: string[]
    lastUpdate: string
    title: string
}
export type Subtask = {
    id: string
    lastUpdate: string
    title: string
}
export type Epic = {
    id: string
    lastUpdate: string
    title: string
}
export type TeamMember = {
    id: string
    lastUpdate: string
    firstName: string
    lastName: string
    role: "Full Stack" | "Backend" | "Frontend"
}
const createId = () : string => {
    return uuidv4()
}
export const createBacklog = () : Backlog => {
    return {
        id: createId(),
        lastUpdate: Date(),
        storyIds: [],
    }
}
export const createTask = () : Task => {
    return {
        id: createId(),
        lastUpdate: Date(),
        subtaskIds: [],
        title: "new task"
    }
}
export const createEpic = () : Epic => {
    return {
        id: createId(),
        lastUpdate: Date(),
        title: "new epic"
    }
}
export const createTeamMember = () : TeamMember => {
    return {
        id: createId(),
        lastUpdate: Date(), 
        firstName: "",
        lastName: "",
        role: "Full Stack"
    }
}
export const createStory = () : Story => {
    return {
        id: createId(),
        ownerId: "",
        epicId: "",
        taskIds: [],
        lastUpdate: Date(),
        title: "New story",
        acceptanceCriteria: "",
        points: 1,
        status: "To Do"
    }
}
export const createSprint = () : Sprint => {
    return {
        id: createId(),
        storyIds: [],
        lastUpdate: Date(),
        sprintNumber: 0
    }
}
export const createProject = () : Project => {
    return {
        id: createId(),
        backlogId: "",
        sprintIds: [],
        teamMemberIds: [],
        epicIds: [],
        lastUpdate: Date(),
        title: "New project"
    }
}
export const initialUserDataState : UserData = {
    projects: {
        byId: {},
        allIds: []
    },
    backlogs: {
        byId: {},
        allIds: []
    },
    sprints: {
        byId: {},
        allIds: []
    },
    stories: {
        byId: {},
        allIds: []
    },
    tasks: {
        byId: {},
        allIds: []
    },
    subtasks: {
        byId: {},
        allIds: []
    },
    epics: {
        byId: {},
        allIds: []
    },
    team: {
        byId: {},
        allIds: []
    }
}
export const Statuses = ["To Do", "In Progress", "In Review", "Complete"]
