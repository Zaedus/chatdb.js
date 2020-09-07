# ChatDB.js
[![NPM version](https://img.shields.io/npm/v/glitchapi.js?style=flat-square)](https://www.npmjs.com/package/chatdb.js)
![built with typescript](https://camo.githubusercontent.com/92e9f7b1209bab9e3e9cd8cdf62f072a624da461/68747470733a2f2f666c61742e62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565) 
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

## Documentation

### Constructors

* [constructor](_app_.chat.md#constructor)

### Properties

* [db](_app_.chat.md#db)
* [json](_app_.chat.md#json)
* [path](_app_.chat.md#path)

### Methods

* [close](_app_.chat.md#close)
* [dbDateToDate](_app_.chat.md#private-dbdatetodate)
* [getConversations](_app_.chat.md#getconversations)
* [getHandles](_app_.chat.md#gethandles)
* [getMessages](_app_.chat.md#getmessages)
* [init](_app_.chat.md#init)
* [parse](_app_.chat.md#parse)

## Constructors

###  constructor

\+ **new Chat**(`path?`: string): *[Chat](_app_.chat.md)*

*Defined in [app.ts:12](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`path?` | string |

**Returns:** *[Chat](_app_.chat.md)*

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

▸ **init**(): *Promise‹[Chat](_app_.chat.md)›*

*Defined in [app.ts:19](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L19)*

**Returns:** *Promise‹[Chat](_app_.chat.md)›*

___

###  parse

▸ **parse**(): *Promise‹Conversation[]›*

*Defined in [app.ts:28](https://github.com/Zaedus/chatdb.js/blob/7f08eae/app.ts#L28)*

**Returns:** *Promise‹Conversation[]›*
