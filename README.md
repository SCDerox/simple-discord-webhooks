# simple-discord-webhooks

<p align="center"><a href="https://nodei.co/npm/simple-discord-webhooks/"><img alt="npm package stats" src="https://nodei.co/npm/simple-discord-webhooks.png"></a></p>

# Features

* Send webhook messages
* Edit webhook messages
* Delete webhook messages
* Fetch webhook messages
* Delete and edit webhooks
* Support for custom avatarUrl and username per message
* Support for [Embed-Objects](https://discord.com/developers/docs/resources/channel#embed-object)
* Support for [Allowed-Mentions-Object](https://discord.com/developers/docs/resources/channel#allowed-mentions-object)
* Support for [Message-Component-Object](https://discord.com/developers/docs/interactions/message-components#component-object). ⚠ This will only work, if your webhook is owned by an application. 

# Install from [NPM](https://www.npmjs.com/package/simple-discord-webhooks)

`$ npm i simple-discord-webhooks --save`

## Changelog
You can find the changelog [here](CHANGELOG.md). 

# Example Usage

```js
const {Webhook} = require('simple-discord-webhooks');

const webhook = new Webhook('https://discord.com/api/webhooks/820304489637871657/QPZWXNS6wUsQ7iKA-Sm7YDIODCbxk60WNeRDoPtEOxZaMvlqbrM_1LQ_LVZHMNhbdz6N');

webhook.send('This message should get edited (hopefully) soon').then(async (result) => {
    setTimeout(async () => {
        await result.edit('And should get deleted (hopefully) soon');
        console.log('Successfully edited send message!');
    }, 3000);
    setTimeout(async () => {
        await result.delete();
        console.log('Successfully deleted send message!');
    }, 6000);
});

const message = webhook.resolveMessageID('820311219432194068');
message.edit('Hello there!').then(() => console.log('Edited message'))
```

# API

* Class: `Webhook(url, username = null, avatarUrl = null)`
    * function `send(content, embeds = [], allowedMentions = {}, tts = false)` - Sends a message
        * content (string): Content of the message
        * embeds (array, optional): Array
          of [Embed-Objects](https://discord.com/developers/docs/resources/channel#embed-object)
        * allowedMentions (object, optional):
          A [Allowed-Mentions-Object](https://discord.com/developers/docs/resources/channel#allowed-mentions-object)
        * tts (boolean, optional): Set to `true` to enable TTS.
        * components (array, optional): Array
          of [message components](https://discord.com/developers/docs/interactions/message-components#component-object).
          ⚠ This will only work, if your webhook is owned by an application.
        * Returns `Promise<Message>` (with all the values
          from [here](https://discord.com/developers/docs/resources/channel#message-object))
    * function `edit(name = null, base64Avatar = null)` - Edits the webhook object
        * name (string, optional): New username of the webhook
        * base64Avatar (base64String (string), optional): [Base64](https://en.wikipedia.org/wiki/Base64) -String of your
          image. If you don't know how to use this, please google `Image to Base64 nodejs` or `File to Base 64` if you
          have an image file.
    * function `fetchMessage(id)` - Fetches a message. Includes content and all parameters returned by Discord.
        * id(string): ID of a message send by this webhook
        * Returns `Message`
    * function `delete()` - Deletes the webhook. Use with caution.
    * function `resolveMessageID(messageID)` - Returns a MessageObject of a Message-ID
        * messageID(string): ID of a message send by this webhook
        * Returns `Message`
        * NOTE: You can only get a `Message`-Object with to edit and delete the message - You can not (!) get the
          content of it. Use `fetchMessage(id)` if you want to fetch content too.

* Class: `Message(messageData, webhookurl)`
    * `messageData` (object) has to have a value called `id` with the id of the message in it
    * function `delete()` - Deletes the message
        * Returns `Promise<boolean>` (true if everything went smoothly.)
    * function `edit(content, embeds = [], allowedMentions = {})` - Edits the message
        * content (string): Content of the message
        * embeds (array, optional): Array
          of [Embed-Objects](https://discord.com/developers/docs/resources/channel#embed-object)
        * allowedMentions (object, optional):
          A [Allowed-Mentions-Object](https://discord.com/developers/docs/resources/channel#allowed-mentions-object)
        * components (array, optional): Array
          of [message components](https://discord.com/developers/docs/interactions/message-components#component-object).
          ⚠ This will only work, if your webhook is owned by an application.

        * Returns `Promise<Message>`  (with all the values
          from [here](https://discord.com/developers/docs/resources/channel#message-object))

# Questions or suggestions?

Please create [a discussion](https://github.com/SCDerox/simple-discord-webhooks/discussions) on Github.

# Contributing

Feel free to create any issues and PRs in our [github repository](https://github.com/SCDerox/simple-discord-webhooks) if
you want to contribute.

© Simon Csaba, 22021 | mail[at]scderox.de