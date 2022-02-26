const centra = require('@aero/centra');
const {Message} = require('./Message');

/**
 * Represents a webhook
 */
class Webhook {
    /**
     * Represents a new webhook
     * @param {URL} url Webhook-URL
     * @param {String} username Username of the webhook
     * @param {URL} avatarUrl URL to a avatar
     */
    constructor(url, username = null, avatarUrl = null) {
        this.url = url;
        this.username = username;
        this.avatarUrl = avatarUrl;
    }

    /**
     * Creates a new message as the webhook
     * @param {String} content Content of this message
     * @param {Array<Object>} embeds  Array of [Embed-Objects](https://discord.com/developers/docs/resources/channel#embed-object)
     * @param {Object} allowedMentions  [Allowed-Mentions-Object](https://discord.com/developers/docs/resources/channel#allowed-mentions-object)
     * @param {Boolean} tts If enabled, discord will read out the messages to everyone who hase this channel open
     * @param {Array} components  [Message-Component-Object](https://discord.com/developers/docs/interactions/message-components#component-object). ⚠ This will only work, if your webhook is owned by an application.
     * @return {Promise<Message>} New message
     */
    async send(content, embeds = [], allowedMentions = {}, tts = false, components = []) {
        const res = await centra(this.url + '?wait=true', 'POST').body({
            content: content,
            username: this.username,
            avatar_url: this.avatarUrl,
            tts: tts,
            embeds: embeds,
            allowed_mentions: allowedMentions,
            components: components
        })
            .header('Content-Type', 'application/json')
            .send('form');
        if (res.statusCode !== 200) throw new Error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: ` + res.body.toString())
        return new Message(JSON.parse(res.body.toString()), this.url);
    }

    /**
     * Edits this webhook object
     * @param {String} name New username of the webhook
     * @param {String} base64Avatar [Base64](https://en.wikipedia.org/wiki/Base64)-String of your image. If you don't know how to use this, please google Image to Base64 nodejs or File to Base 64 if you have an image file.
     * @return {Promise<void>}
     */
    async edit(name = null, base64Avatar = null) {
        const res = await centra(this.url, 'PATCH').body({
            name,
            avatar: base64Avatar ? `data:image/jpeg;base64,${base64Avatar}` : null
        })
            .header('Content-Type', 'application/json')
            .send('form');
        if (res.statusCode !== 200) throw new Error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: `+ res.body.toString());
    }

    /**
     * Deletes this message
     * @return {Promise}
     */
    async delete() {
        const res = await centra(this.url, 'DELETE').body().send('form');
        if (res.statusCode !== 204) throw new Error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: ` + res.body.toString());
    }

    /**
     * Fetches a message by ID (including content)
     * @param {String} id ID of the message
     * @return {Promise<Message>} Message
     */
    async fetchMessage(id) {
        const res = await centra(this.url + `/messages/${id}`, 'GET')
            .send('form');
        if (res.statusCode !== 200) throw new Error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: ` + res.body.toString());
        return new Message(JSON.parse(res.body.toString()), this.url)
    }

    /**
     * Resolves a message by ID (will not include any content of this message. Only use this if you want to edit or delate already send messages without having to fetch the message again
     * @param messageID
     * @return {Message}
     */
    resolveMessageID(messageID) {
        return new Message({id: messageID}, this.url);
    }
}

module.exports.Webhook = Webhook;
