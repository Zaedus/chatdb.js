# ChatDB.js

## Data Types

### Conversation

```js
// Group Chat Example

{
    handles: Handle[],
    id: number,           // 1
    displayName: string,  // The Boys
    lastRead: Date,       // 2020-09-06T02:17:25.196Z
    identifier: string    // chat123456789101112131
}

// DM Example

{
    handles: Handle[],
    id: number,           // 2
    displayName: string,  // null
    lastRead: Date,       // 2020-09-06T02:19:30.261Z
    identifier: string    // +12345678910
}

```