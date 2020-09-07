"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
const os = require("os");
const path_1 = require("path");
class Chat {
    constructor(path) {
        this.path = path || path_1.join(os.homedir(), "/Library/Messages/chat.db");
        this.db = null;
        this.json = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield sqlite_1.open({
                filename: this.path,
                driver: sqlite3_1.Database
            });
            const db = this.db;
            const chat = yield db.all("SELECT * FROM chat");
            for (let row of chat) {
                let handles = [];
                let messages = [];
                const chatHandleMap = (yield db.all(`SELECT handle_id FROM chat_handle_join WHERE chat_id = ${row.ROWID}`)).map(v => v.handle_id);
                for (let handleID of chatHandleMap) {
                    const handle = (yield db.get(`SELECT * FROM handle WHERE ROWID = ${handleID}`));
                    handles.push({
                        country: handle.country,
                        id: handle.ROWID,
                        name: handle.id,
                        service: handle.service
                    });
                }
                const chatMessageMap = (yield db.all(`SELECT message_id FROM chat_message_join WHERE chat_id = ${row.ROWID}`)).map(v => v.message_id);
                for (let messageID of chatMessageMap) {
                    const messageAttachmentMap = (yield db.all(`SELECT attachment_id FROM message_attachment_join WHERE message_id = ${messageID}`)).map(v => v.attachment_id);
                    const attachments = [];
                    const message = (yield db.all(`SELECT * FROM message WHERE ROWID = ${messageID}`))[0];
                    for (let attachmentID of messageAttachmentMap) {
                        const attachment = (yield db.all(`SELECT * FROM attachment WHERE ROWID = ${attachmentID}`))[0];
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
                        sent: message.is_sent == 1 ? true : false,
                        service: message.service,
                        text: message.text,
                        attachment: attachments
                    });
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
        });
    }
    getHandles() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const tableHandles = (yield db.all("SELECT * FROM handle"));
            let handles = [];
            for (let handle of tableHandles) {
                handles.push({
                    country: handle.country,
                    name: handle.id,
                    id: handle.ROWID,
                    service: handle.service
                });
            }
            return handles;
        });
    }
    getConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const tableChats = (yield db.all("SELECT * FROM chat"));
            let chats = [];
            for (let chat of tableChats) {
                chats.push({
                    displayName: chat.display_name,
                    id: chat.ROWID,
                    identifier: chat.chat_identifier,
                    lastRead: this.dbDateToDate(chat.last_read_message_timestamp),
                });
            }
            return chats;
        });
    }
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const handles = yield this.getHandles();
            const chatMessageMap = (yield db.all(`SELECT message_id FROM chat_message_join`)).map(v => v.message_id);
            let messages = [];
            for (let messageID of chatMessageMap) {
                const messageAttachmentMap = (yield db.all(`SELECT attachment_id FROM message_attachment_join WHERE message_id = ${messageID}`)).map(v => v.attachment_id);
                const attachments = [];
                const message = (yield db.all(`SELECT * FROM message WHERE ROWID = ${messageID}`))[0];
                for (let attachmentID of messageAttachmentMap) {
                    const attachment = (yield db.all(`SELECT * FROM attachment WHERE ROWID = ${attachmentID}`))[0];
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
                    sent: message.is_sent == 1 ? true : false,
                    service: message.service,
                    text: message.text,
                    attachment: attachments
                });
            }
            return messages;
        });
    }
    close() {
        return this.db.close();
    }
    dbDateToDate(nano) {
        return nano == 0 ? null : new Date(nano / 1000000 + (978307200000));
    }
}
exports.Chat = Chat;
