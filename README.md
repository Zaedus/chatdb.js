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
* [getConversations](#getconversations)
* [getHandles](#gethandles)
* [getMessages](#getmessages)
* [init](#init)
* [parse](#parse)

## Constructors

###  constructor

\+ **new Chat**(`path?`: string): *[Chat]()*

*Defined in [app.ts:12](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`path?` | string |

**Returns:** *[Chat]()*

## Properties

###  db

• **db**: *DatabaseSqlite‹Database, Statement›*

*Defined in [app.ts:11](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L11)*

___

###  json

• **json**: *Conversation[]*

*Defined in [app.ts:12](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L12)*

___

###  path

• **path**: *string*

*Defined in [app.ts:10](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L10)*

## Methods

###  close

▸ **close**(): *Promise‹void›*

*Defined in [app.ts:174](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L174)*

**Returns:** *Promise‹void›*

___

### `Private` dbDateToDate

▸ **dbDateToDate**(`nano`: number): *Date*

*Defined in [app.ts:178](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`nano` | number |

**Returns:** *Date*

___

###  getConversations

▸ **getConversations**(`max?`: number, `reverse?`: boolean): *Promise‹Conversation[]›*

*Defined in [app.ts:111](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`max?` | number |
`reverse?` | boolean |

**Returns:** *Promise‹Conversation[]›*

___

###  getHandles

▸ **getHandles**(`max?`: number, `reverse?`: boolean): *Promise‹Handle[]›*

*Defined in [app.ts:90](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`max?` | number |
`reverse?` | boolean |

**Returns:** *Promise‹Handle[]›*

___

###  getMessages

▸ **getMessages**(`max?`: number, `reverse?`: boolean): *Promise‹Message[]›*

*Defined in [app.ts:132](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`max?` | number |
`reverse?` | boolean |

**Returns:** *Promise‹Message[]›*

___

###  init

▸ **init**(): *Promise‹[Chat]()›*

*Defined in [app.ts:19](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L19)*

**Returns:** *Promise‹[Chat]()›*

___

###  parse

▸ **parse**(): *Promise‹Conversation[]›*

*Defined in [app.ts:28](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L28)*

**Returns:** *Promise‹Conversation[]›*
