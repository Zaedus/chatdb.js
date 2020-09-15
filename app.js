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
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield sqlite_1.open({
                filename: this.path,
                driver: sqlite3_1.Database
            });
            return this;
        });
    }
    parse() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            let conversations = [];
            const chat = yield db.all("SELECT * FROM chat");
            for (let row of chat) {
                let handles = [];
                let messages = [];
                const chatToMessage = yield db.all(`SELECT handle_id FROM chat_handle_join WHERE chat_id = ${row.ROWID}`);
                const chatHandleMap = chatToMessage.map(v => v.handle_id);
                for (let handleID of chatHandleMap) {
                    const handle = (yield db.get(`SELECT * FROM handle WHERE ROWID = ${handleID}`));
                    const chatHandleJoin = (yield db.all(`SELECT * FROM chat_handle_join WHERE handle_id = ${handleID}`));
                    handles.push({
                        country: handle.country,
                        id: handle.ROWID,
                        name: handle.id,
                        service: handle.service,
                        conversationIds: chatHandleJoin.map(v => v.chat_id)
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
                        conversationId: chatToMessage.find(v => v.message_id == message.ROWID).chat_id,
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
                    });
                }
                conversations.push({
                    displayName: row.display_name,
                    handles: handles,
                    messages: messages,
                    id: row.ROWID,
                    identifier: row.chat_identifier,
                    lastRead: this.dbDateToDate(row.last_read_message_timestamp),
                    guid: row.guid
                });
            }
            return conversations;
        });
    }
    getHandles(max, reverse) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const tableHandles = (yield db.all("SELECT * FROM handle"));
            let handles = [];
            if (max > tableHandles.length)
                throw new Error("'max' out of range.");
            const endValue = max ? reverse ? (tableHandles.length) - (max) : max : tableHandles.length;
            const startValue = reverse ? tableHandles.length - 1 : 0;
            const change = reverse ? -1 : 1;
            for (let handleIndex = startValue; (reverse ? handleIndex > endValue - 1 : handleIndex < endValue); handleIndex += change) {
                let handle = tableHandles[handleIndex];
                const chatHandleJoin = (yield db.all(`SELECT * FROM chat_handle_join WHERE handle_id = ${handleIndex}`));
                handles.push({
                    country: handle.country,
                    name: handle.id,
                    id: handle.ROWID,
                    service: handle.service,
                    conversationIds: chatHandleJoin.map(v => v.chat_id)
                });
            }
            return handles;
        });
    }
    getConversations(max, reverse) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const tableChats = (yield db.all("SELECT * FROM chat"));
            let chats = [];
            if (max > tableChats.length)
                throw new Error("'max' out of range.");
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
                    guid: chat.guid
                });
            }
            return chats;
        });
    }
    getMessages(max, reverse) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const handles = yield this.getHandles();
            const chatToMessage = yield db.all(`SELECT message_id FROM chat_message_join`);
            const chatMessageMap = chatToMessage.map(v => v.message_id);
            let messages = [];
            if (max) {
                if (max > (yield this.getMessageCount()))
                    throw new Error("'max' out of range.");
            }
            const endValue = max ? reverse ? (chatMessageMap.length) - (max) : max : chatMessageMap.length;
            const startValue = reverse ? chatMessageMap.length - 1 : 0;
            const change = reverse ? -1 : 1;
            for (let messageIndex = startValue; (reverse ? messageIndex > endValue - 1 : messageIndex < endValue); messageIndex += change) {
                const messageID = chatMessageMap[messageIndex];
                if (!messageID)
                    continue;
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
                    conversationId: chatToMessage.find(v => v.message_id == message.ROWID).chat_id,
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
                });
            }
            return messages;
        });
    }
    getConversationCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.db.get("SELECT COUNT(*) FROM chat"))['COUNT(*)'];
        });
    }
    getHandleCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.db.get("SELECT COUNT(*) FROM handle"))['COUNT(*)'];
        });
    }
    getMessageCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.db.get("SELECT COUNT(*) FROM message"))['COUNT(*)'];
            }
            catch (e) {
                console.error(new Error(e));
            }
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
