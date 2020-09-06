export interface Conversation {
    handles: Handle[],
    id: number,
    displayName: string,
    lastRead: Date | null,
    identifier: string
}
export interface Handle {
    service: "iMessage" | "SMS",
    id: number,
    name: string,
    country: string
}

export interface Message {
    handle: Handle,
    text: string,
    dateSent: Date,
    id: number,
    service: "iMessage" | "SMS",
    sent: boolean
}