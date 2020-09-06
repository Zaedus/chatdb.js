import { Database } from "sqlite3";

export class Chat {

    path: string;
    db: Database;
    constructor(path?: string) {
        this.path = path || "~/Library/Messages/chat.db";
        this.db = new Database(this.path, (e) => console.error(e));
    }
}