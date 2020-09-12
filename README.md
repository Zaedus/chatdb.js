# ChatDB.js
[![NPM version](https://img.shields.io/npm/v/glitchapi.js?style=flat-square)](https://www.npmjs.com/package/chatdb.js)
![built with typescript](https://camo.githubusercontent.com/92e9f7b1209bab9e3e9cd8cdf62f072a624da461/68747470733a2f2f666c61742e62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565) 
[![](https://img.shields.io/badge/Give%20it%20a-star!-yellow?style=flat-square)](https://github.com/Zaedus/chatdb.js)
> A library that parses the chat.db file on Macs 
> into a comprehensive data structure using ES6 promises.

## Installation

`$ npm install chatdb.js`

## Getting Started

```js
// Import the package
const { Chat } = require('chatdb.js');

(async function () {
    // Create new instance of Chat 
    // and initialize it asynchronously
    const chat = await new Chat('/path/to/chat.db').init();

    // ... Do the thing
}())
```

## Examples

### Simple Message Logger

```js
const { Chat } = require('chatdb.js');
const fs = require('fs');

(async function() {
    const chat = await new Chat().init(); // Initialize Client
    const lastId = 0;
    // Declare loop
    async function loop() {
        const msg = (await chat.getMessages(1, true))[0]; // Get the most recent message

        if(msg.id != lastId) { // Check if the most recent message id changed
            lastId = msg.id;
            console.log(`${msg.isFromMe ? "Me" : msg.handle.name}: ${msg.text}`); // Format and log the message
        }
    }

    setInterval(loop, 1000); // Start loop
}());
```

## Common Problems

> W.I.P.

## Documentation

### Constructors

* [constructor](#constructor)

### Properties

* [db](#db)
* [json](#json)
* [path](#path)

### Methods

* [close](#close)
* [dbDateToDate](#private-dbdatetodate)
* [getConversationCount](#getconversationcount)
* [getConversations](#getconversations)
* [getHandleCount](#gethandlecount)
* [getHandles](#gethandles)
* [getMessageCount](#getmessagecount)
* [getMessages](#getmessages)
* [init](#init)
* [parse](#parse)

## Constructors

###  constructor

\+ **new Chat**(`path?`: string): *[Chat]()*

*Defined in [app.ts:12](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`path?` | string |

**Returns:** *[Chat]()*

## Properties

###  db

• **db**: *DatabaseSqlite‹Database, Statement›*

*Defined in [app.ts:11](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L11)*

___

###  json

• **json**: *Conversation[]*

*Defined in [app.ts:12](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L12)*

___

###  path

• **path**: *string*

*Defined in [app.ts:10](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L10)*

## Methods

###  close

▸ **close**(): *Promise‹void›*

*Defined in [app.ts:224](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L224)*

**Returns:** *Promise‹void›*

___

### `Private` dbDateToDate

▸ **dbDateToDate**(`nano`: number): *Date*

*Defined in [app.ts:228](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`nano` | number |

**Returns:** *Date*

___

###  getConversationCount

▸ **getConversationCount**(): *Promise‹any›*

*Defined in [app.ts:212](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L212)*

**Returns:** *Promise‹any›*

___

###  getConversations

▸ **getConversations**(`max?`: number, `reverse?`: boolean): *Promise‹Conversation[]›*

*Defined in [app.ts:130](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`max?` | number |
`reverse?` | boolean |

**Returns:** *Promise‹Conversation[]›*

___

###  getHandleCount

▸ **getHandleCount**(): *Promise‹any›*

*Defined in [app.ts:216](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L216)*

**Returns:** *Promise‹any›*

___

###  getHandles

▸ **getHandles**(`max?`: number, `reverse?`: boolean): *Promise‹Handle[]›*

*Defined in [app.ts:109](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`max?` | number |
`reverse?` | boolean |

**Returns:** *Promise‹Handle[]›*

___

###  getMessageCount

▸ **getMessageCount**(): *Promise‹any›*

*Defined in [app.ts:220](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L220)*

**Returns:** *Promise‹any›*

___

###  getMessages

▸ **getMessages**(`max?`: number, `reverse?`: boolean): *Promise‹Message[]›*

*Defined in [app.ts:151](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`max?` | number |
`reverse?` | boolean |

**Returns:** *Promise‹Message[]›*

___

###  init

▸ **init**(): *Promise‹[Chat]()›*

*Defined in [app.ts:19](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L19)*

**Returns:** *Promise‹[Chat]()›*

___

###  parse

▸ **parse**(): *Promise‹Conversation[]›*

*Defined in [app.ts:28](https://github.com/Zaedus/chatdb.js/blob/c1234aa/app.ts#L28)*

**Returns:** *Promise‹Conversation[]›*
