import { Chat } from "./app";

const chat = new Chat("./chat.db");

(async () => {
    await chat.init();
    //console.log(chat.json);
})();