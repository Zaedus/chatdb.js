export interface Conversation {
    handles?:       Handle[],
    messages?:      Message[],
    id:             number,
    displayName:    string,
    lastRead:       Date | null,
    identifier:     string
}
export interface Handle {
    service:    string,
    id:         number,
    name:       string,
    country:    string
}

export interface Message {
    handle: Handle,
    conversationId: number,
    text:       string,
    date:       Date,
    dateSent:   Date,
    id:         number,
    service:    string,
    attachment: Attachment[],
    isDelivered:  boolean,
    isFinished:   boolean,
    isEmote: boolean,
    isFromMe: boolean,
    isEmpty: boolean,
    isDelayed: boolean,
    isAutoReply: boolean,
    isPrepared: boolean,
    isRead: boolean,
    isSystemMessage: boolean,
    isSent: boolean,
    hasDDResults: boolean,
    isServiceMessage: boolean,
    isForward: boolean,
    wasDowngraded: boolean,
    isArchive: boolean,
    cacheHasAttachments: boolean,
    isSpam: boolean,
    isAudioMessage: boolean,
    dataDetected: boolean
    
}

export interface Attachment {
    id:         number,
    filename:   string,
    mime:       string,
    name:       string,
    size:       number
}