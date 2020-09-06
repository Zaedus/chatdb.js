export interface Conversation {
    handles: Handle[],
    messages: Message[],
    id: number,
    displayName: string,
    lastRead: Date | null,
    identifier: string
}
export interface Handle {
    service: string,
    id: number,
    name: string,
    country: string
}

export interface Message {
    handle: Handle,
    text: string,
    dateSent: Date,
    id: number,
    service: string,
    sent: boolean,
    attachment: Attachment[]
}

export interface Attachment {
    id: number,
    filename: string,
    mime: string,
    name: string,
    size: number
}