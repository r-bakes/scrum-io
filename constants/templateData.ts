export type Templates = {
    stories: {
        byId: {
            [key: string] : StoryTemplate
        }
        allIds: string[]
    }   
}
export type StoryTemplate = {
    id: string
    acceptanceCriteria: string
    shortTitle: string
    title: string
    tags: string[]
    tasks: string[]
}
export const initialTemplatesState = {
    stories: {byId: {}, allIds: []}
}