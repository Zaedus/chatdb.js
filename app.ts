import { Database } from "sqlite-async";
import { Conversation } from "./types";
import { ChatTableRow } from "./db"
import { promisify } from "util";

export class Chat {

    path: string;
    db: Database;
    json: Conversation[];

    constructor(path?: string) {
        this.path = path || "~/Library/Messages/chat.db";
        this.db = null;
        this.json = [];
    }

    public init(): Promise<void> {
        return new Promise<void>(async (res, rej) => {
            this.db = await Database.open(this.path);
            const db = this.db;

            db.each("SELECT * FROM chat", (err, row : ChatTableRow) => {
                if (err) return console.error(err);
                const data = db.all(`SELECT * FROM chat_handle_join WHERE chat_id = ${row.ROWID}`);
                console.log(data)
                this.json.push({
                    displayName: row.display_name,
                    handles: [],
                    id: row.ROWID,
                    identifier: row.chat_identifier,
                    lastRead: row.last_read_message_timestamp == 0 ? null : this.dbDateToDate(row.last_read_message_timestamp)
                });
            }, (err, count) => {
                if (err) return console.error(err);
                res();
            });
        })
    }

    private dbDateToDate(nano: number): Date {
        return new Date(nano/1000000 + (978307200000));
    }
}