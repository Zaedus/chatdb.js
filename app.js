"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
class Chat {
    constructor(path) {
        this.path = path || "~/Library/Messages/chat.db";
        this.db = new sqlite3_1.Database(this.path, (e) => console.error(e));
    }
}
exports.Chat = Chat;
