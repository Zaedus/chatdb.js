"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_async_1 = require("sqlite-async");
class Chat {
    constructor(path) {
        this.path = path || "~/Library/Messages/chat.db";
        this.db = new sqlite_async_1.Database(path);
        this.json = [];
    }
    init() {
        return new Promise((res, rej) => {
            const db = this.db;
            db.each("SELECT * FROM chat", (err, row) => {
                if (err)
                    return console.error(err);
                let a;
                db.all("SELECT * FROM chat_handle_join WHERE chat_id = 1", (err, rows) => {
                    a = rows;
                });
                console.log(a);
                this.json.push({
                    displayName: row.display_name,
                    handles: [],
                    id: row.ROWID,
                    identifier: row.chat_identifier,
                    lastRead: row.last_read_message_timestamp == 0 ? null : this.dbDateToDate(row.last_read_message_timestamp)
                });
            }, (err, count) => {
                if (err)
                    return console.error(err);
                res();
            });
        });
    }
    dbDateToDate(nano) {
        return new Date(nano / 1000000 + (978307200000));
    }
}
exports.Chat = Chat;
