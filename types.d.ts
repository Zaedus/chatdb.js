export interface Conversation {
    handles: Handle[],
    id: number,
    roomName: string,
    displayName: string,
    lastRead: Date,
    identifier: string
}
export interface Handle {
    service: "iMessage" | "SMS",
    id: number,
    name: string,
    country: string
}
