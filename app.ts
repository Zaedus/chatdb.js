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
        this.json = [];
    }

    public async init(): Promise<Chat> {
        this.db = await open({
            filename: this.path,
            driver: Database
        });
        const db = this.db;

        const chat: ChatTableRow[] = await db.all("SELECT * FROM chat");

        for (let row of chat) {
            
            let handles:  Handle[]  = [];
            let messages: Message[] = [];

            const chatHandleMap = (await db.all(`SELECT handle_id FROM chat_handle_join WHERE chat_id = ${row.ROWID}`)).map(v => v.handle_id);
            for (let handleID of chatHandleMap) {
                const handle : HandleTableRow = (await db.get(`SELECT * FROM handle WHERE ROWID = ${handleID}`));
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
                    handle: handles.find(v => v.id == message.handle_id),
                    id: message.ROWID,
                    sent: message.is_sent == 1 ? true : false,
                    service: message.service,
                    text: message.text,
                    attachment: attachments
                })
            }
            this.json.push({
                displayName: row.display_name,
                handles: handles,
                messages: messages,
                id: row.ROWID,
                identifier: row.chat_identifier,
                lastRead: this.dbDateToDate(row.last_read_message_timestamp)
            });
        }
        return this;
    }

    public async getHandles(): Promise<Handle[]> {
        const db = this.db;
        const tableHandles: HandleTableRow[] = (await db.all("SELECT * FROM handle"));
        let handles: Handle[] = [];

        for (let handle of tableHandles) {
            handles.push({
                country: handle.country,
                name: handle.id,
                id: handle.ROWID,
                service: handle.service
            })
        }
        return handles;
    }

    public async getConversations(): Promise<Conversation[]> {
        const db = this.db;
        const tableChats: ChatTableRow[] = (await db.all("SELECT * FROM chat"));
        let chats: Conversation[] = [];

        for (let chat of tableChats) {
            chats.push({
                displayName: chat.display_name,
                id: chat.ROWID,
                identifier: chat.chat_identifier,
                lastRead: this.dbDateToDate(chat.last_read_message_timestamp),
            })
        }
        return chats;
    }

    public async getMessages() {
        const db = this.db;
        const handles = await this.getHandles();
        const chatMessageMap = (await db.all(`SELECT message_id FROM chat_message_join`)).map(v => v.message_id);
        let messages: Message[] = [];
        
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
                handle: handles.find(v => v.id == message.handle_id),
                id: message.ROWID,
                sent: message.is_sent == 1 ? true : false,
                service: message.service,
                text: message.text,
                attachment: attachments
            })
        }
        return messages;
    }

    public close() {
        return this.db.close();
    }

    private dbDateToDate(nano: number): Date {
        return nano == 0 ? null : new Date(nano/1000000 + (978307200000));
    }
}