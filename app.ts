import { Database } from "sqlite3";
import { Conversation } from "./types";

export class Chat {

    path: string;
    db: Database;
    json: Conversation[];

    constructor(path?: string) {
        this.path = path || "~/Library/Messages/chat.db";
        this.db = new Database(this.path, (e) => console.error(e));

        this.compute();
    }


    private compute() {
        
    }
}