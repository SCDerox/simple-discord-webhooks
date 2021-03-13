# simple-discord-webhooks

<p align="center"><a href="https://nodei.co/npm/simple-discord-webhooks/"><img alt="npm package stats" src="https://nodei.co/npm/simple-discord-webhooks.png"></a></p>

# Features

* Send webhook messages
* Edit webhook messages
* Delete webhook messages
* Support for custom avatarUrl and username
* Support for [Embed-Objects](https://discord.com/developers/docs/resources/channel#embed-object)
* Support for [Allowed-Mentions-Object](https://discord.com/developers/docs/resources/channel#allowed-mentions-object)

# Install from [NPM](https://www.npmjs.com/package/simple-discord-webhooks)

`$ npm i simple-discord-webhooks --save`

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
        * Returns `Promise<Message>` (with all the values
          from [here](https://discord.com/developers/docs/resources/channel#message-object))
    * function `resolveMessageID(messageID)` - Returns a MessageObject of a Message-ID
        * messageID(string): ID of a message send by this webhook
        * Returns `Message`
        * NOTE: You can only get a `Message`-Object with to edit and delete the message - You can not (!) get the
          content of it.

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
        * Returns `Promise<Message>`  (with all the values
          from [here](https://discord.com/developers/docs/resources/channel#message-object))

# Questions or suggestions?

Feel free to send me a DM on Discord: `SCDerox#4645`

# Contributing

Feel free to create any issues and PRs in our [github repository](https://github.com/SCDerox/simple-discord-webhooks) if you
want to contribute.

© Simon Csaba, 22021 | mail[at]scderox.de