# simple-discord-webhooks

<p align="center"><a href="https://nodei.co/npm/simple-discord-webhooks/"><img alt="npm package stats" src="https://nodei.co/npm/simple-discord-webhooks.png"></a></p>
<p align="center"><a href="https://github.com/scderox/simple-discord-webhooks?sponsor=1">&hearts; Sponsor</a> or <a href="https://github.com/SCDerox/simple-discord-webhooks">★ Star</a></p>

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
Please refer to the [online documentation](https://scderox.github.io/simple-discord-webhooks/). 

# Questions or suggestions?

Please create [a discussion](https://github.com/SCDerox/simple-discord-webhooks/discussions) on Github.

# Contributing

Feel free to create any issues and PRs in our [github repository](https://github.com/SCDerox/simple-discord-webhooks) if
you want to contribute.

© Simon Csaba, 22021 | mail[at]scderox.de