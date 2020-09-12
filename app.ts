import { Database, Statement } from "sqlite3";
import { open, Database as DatabaseSqlite } from "sqlite";
import { Conversation, Handle, Message, Attachment } from './types';
import { ChatTableRow, HandleTableRow, MessageTableRow, AttachmentTableRow } from './db';
import * as os from "os";
import { join } from "path";

export class Chat {

    public path: string;
    public db: DatabaseSqlite<Database, Statement>;
    public json: Conversation[];

    constructor(path?: string) {
        this.path = path || join(os.homedir(), "/Library/Messages/chat.db");
        this.db = null;
    }

    public async init(): Promise<Chat> {
        this.db = await open({
            filename: this.path,
            driver: Database
        });

        return this;
    }

    public async parse(): Promise<Conversation[]> {
        const db = this.db;
        let conversations: Conversation[] = [];

        const chat: ChatTableRow[] = await db.all("SELECT * FROM chat");

        for (let row of chat) {

            let handles: Handle[] = [];
            let messages: Message[] = [];

            const chatHandleMap = (await db.all(`SELECT handle_id FROM chat_handle_join WHERE chat_id = ${row.ROWID}`)).map(v => v.handle_id);
            for (let handleID of chatHandleMap) {
                const handle: HandleTableRow = (await db.get(`SELECT * FROM handle WHERE ROWID = ${handleID}`));
                handles.push({
                    country: handle.country,
                    id: handle.ROWID,
                    name: handle.id,
                    service: handle.service
                });
            }
            const chatMessageMap = (await db.all(`SELECT message_id FROM chat_message_join WHERE chat_id = ${row.ROWID}`)).map(v => v.message_id);
            for (let messageID of chatMessageMap) {
                const messageAttachmentMap = (await db.all(`SELECT attachment_id FROM message_attachment_join WHERE message_id = ${messageID}`)).map(v => v.attachment_id);
                const attachments: Attachment[] = [];
                const message: MessageTableRow = (await db.all(`SELECT * FROM message WHERE ROWID = ${messageID}`))[0];

                for (let attachmentID of messageAttachmentMap) {
                    const attachment: AttachmentTableRow = (await db.all(`SELECT * FROM attachment WHERE ROWID = ${attachmentID}`))[0];

                    attachments.push({
                        filename: attachment.filename,
                        id: attachment.ROWID,
                        mime: attachment.mime_type,
                        name: attachment.transfer_name,
                        size: attachment.total_bytes
                    });
                }

                messages.push({
                    dateSent: this.dbDateToDate(message.date_delivered),
                    date: this.dbDateToDate(message.date),
                    handle: handles.find(v => v.id == message.handle_id),
                    id: message.ROWID,
                    service: message.service,
                    text: message.text,
                    attachment: attachments,
                    isSent: message.is_sent == 1 ? true : false,
                    cacheHasAttachments: message.cache_has_attachments == 1 ? true : false,
                    dataDetected: message.was_data_detected == 1 ? true : false,
                    hasDDResults: message.has_dd_results == 1 ? true : false,
                    isArchive: message.is_archive == 1 ? true : false,
                    isAudioMessage: message.is_audio_message == 1 ? true : false,
                    isAutoReply: message.is_auto_reply == 1 ? true : false,
                    isDelayed: message.is_delayed == 1 ? true : false,
                    isDelivered: message.is_delivered == 1 ? true : false,
                    isEmote: message.is_emote == 1 ? true : false,
                    isEmpty: message.is_empty == 1 ? true : false,
                    isFinished: message.is_finished == 1 ? true : false,
                    isForward: message.is_finished == 1 ? true : false,
                    isFromMe: message.is_from_me == 1 ? true : false,
                    isPrepared: message.is_prepared == 1 ? true : false,
                    isRead: message.is_read == 1 ? true : false,
                    isServiceMessage: message.is_service_message == 1 ? true : false,
                    isSpam: message.is_spam == 1 ? true : false,
                    isSystemMessage: message.is_system_message == 1 ? true : false,
                    wasDowngraded: message.was_downgraded == 1 ? true : false
                })
            }
            conversations.push({
                displayName: row.display_name,
                handles: handles,
                messages: messages,
                id: row.ROWID,
                identifier: row.chat_identifier,
                lastRead: this.dbDateToDate(row.last_read_message_timestamp)
            });
        }
        return conversations;
    }

    public async getHandles(max?: number, reverse?: boolean): Promise<Handle[]> {
        const db = this.db;
        const tableHandles: HandleTableRow[] = (await db.all("SELECT * FROM handle"));
        let handles: Handle[] = [];

        const endValue = max ? reverse ? (tableHandles.length) - (max) : max : tableHandles.length;
        const startValue = reverse ? tableHandles.length - 1 : 0;
        const change = reverse ? -1 : 1;

        for (let handleIndex = startValue; (reverse ? handleIndex > endValue - 1 : handleIndex < endValue); handleIndex += change) {
            let handle = tableHandles[handleIndex];
            handles.push({
                country: handle.country,
                name: handle.id,
                id: handle.ROWID,
                service: handle.service
            })
        }
        return handles;
    }

    public async getConversations(max?: number, reverse?: boolean): Promise<Conversation[]> {
        const db = this.db;
        const tableChats: ChatTableRow[] = (await db.all("SELECT * FROM chat"));
        let chats: Conversation[] = [];

        const endValue = max ? reverse ? (tableChats.length) - (max) : max : tableChats.length;
        const startValue = reverse ? tableChats.length - 1 : 0;
        const change = reverse ? -1 : 1;

        for (let chatIndex = startValue; (reverse ? chatIndex > endValue - 1 : chatIndex < endValue); chatIndex += change) {
            let chat = tableChats[chatIndex];
            chats.push({
                displayName: chat.display_name,
                id: chat.ROWID,
                identifier: chat.chat_identifier,
                lastRead: this.dbDateToDate(chat.last_read_message_timestamp),
            })
        }
        return chats;
    }

    public async getMessages(max?: number, reverse?: boolean) {
        const db = this.db;
        const handles = await this.getHandles();
        const chatMessageMap = (await db.all(`SELECT message_id FROM chat_message_join`)).map(v => v.message_id);
        let messages: Message[] = [];

        const endValue = max ? reverse ? (chatMessageMap.length) - (max) : max : chatMessageMap.length;
        const startValue = reverse ? chatMessageMap.length - 1 : 0;
        const change = reverse ? -1 : 1;

        for (let messageIndex = startValue; (reverse ? messageIndex > endValue - 1 : messageIndex < endValue); messageIndex += change) {
            const messageID = chatMessageMap[messageIndex];
            const messageAttachmentMap = (await db.all(`SELECT attachment_id FROM message_attachment_join WHERE message_id = ${messageID}`)).map(v => v.attachment_id);
            const attachments: Attachment[] = [];
            const message: MessageTableRow = (await db.all(`SELECT * FROM message WHERE ROWID = ${messageID}`))[0];

            for (let attachmentID of messageAttachmentMap) {
                const attachment: AttachmentTableRow = (await db.all(`SELECT * FROM attachment WHERE ROWID = ${attachmentID}`))[0];

                attachments.push({
                    filename: attachment.filename,
                    id: attachment.ROWID,
                    mime: attachment.mime_type,
                    name: attachment.transfer_name,
                    size: attachment.total_bytes
                });
            }

            messages.push({
                dateSent: this.dbDateToDate(message.date_delivered),
                date: this.dbDateToDate(message.date),
                handle: handles.find(v => v.id == message.handle_id),
                id: message.ROWID,
                service: message.service,
                text: message.text,
                attachment: attachments,
                isSent: message.is_sent == 1 ? true : false,
                cacheHasAttachments: message.cache_has_attachments == 1 ? true : false,
                dataDetected: message.was_data_detected == 1 ? true : false,
                hasDDResults: message.has_dd_results == 1 ? true : false,
                isArchive: message.is_archive == 1 ? true : false,
                isAudioMessage: message.is_audio_message == 1 ? true : false,
                isAutoReply: message.is_auto_reply == 1 ? true : false,
                isDelayed: message.is_delayed == 1 ? true : false,
                isDelivered: message.is_delivered == 1 ? true : false,
                isEmote: message.is_emote == 1 ? true : false,
                isEmpty: message.is_empty == 1 ? true : false,
                isFinished: message.is_finished == 1 ? true : false,
                isForward: message.is_finished == 1 ? true : false,
                isFromMe: message.is_from_me == 1 ? true : false,
                isPrepared: message.is_prepared == 1 ? true : false,
                isRead: message.is_read == 1 ? true : false,
                isServiceMessage: message.is_service_message == 1 ? true : false,
                isSpam: message.is_spam == 1 ? true : false,
                isSystemMessage: message.is_system_message == 1 ? true : false,
                wasDowngraded: message.was_downgraded == 1 ? true : false
            })
        }
        return messages;
    }

    public async getConversationCount() {
        return (await this.db.get("SELECT COUNT(*) FROM chat"))['COUNT(*)'];
    }

    public async getHandleCount() {
        return (await this.db.get("SELECT COUNT(*) FROM handle"))['COUNT(*)'];
    }

    public async getMessageCount() {
        return (await this.db.get("SELECT COUNT(*) FROM message"))['COUNT(*)'];
    }

    public close() {
        return this.db.close();
    }

    private dbDateToDate(nano: number): Date {
        return nano == 0 ? null : new Date(nano / 1000000 + (978307200000));
    }
}