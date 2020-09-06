import { Chat } from "./app";

(async function () {
    const chat = await new Chat("./chat.db").init();

    console.log(await chat.getConversations())
}());