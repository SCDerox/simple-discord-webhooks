const centra = require('@aero/centra');

/**
 * Represents a discord-message
 */
class Message {
    /**
     * Represents a discord-message
     * @param {Object} messageData Raw API-Data from Discord
     * @param {URL} webhookurl Webhook-URL this message belongs to
     */
    constructor(messageData, webhookurl) {
        this.webhookUrl = webhookurl;
        for (const data in messageData) {
            this[data] = messageData[data];
        }
    }

    /**
     * Deletes this message
     * @return {Promise}
     */
    async delete() {
        const res = await centra(this.webhookUrl + `/messages/${this.id}`, 'DELETE')
            .header('Content-Type', 'application/json')
            .send('form');
        if (res.statusCode !== 204) throw new Error(`Something went wrong while deleting the message ${this.id} with the webhook ${this.webhookUrl}. Here is the answer from discord: ` + res.body.toString());
        return true;
    }

    /**
     * Edits this message
     * @param {String} content Content of this message
     * @param {Array<Object>} embeds  Array of [Embed-Objects](https://discord.com/developers/docs/resources/channel#embed-object)
     * @param {Object} allowedMentions  [Allowed-Mentions-Object](https://discord.com/developers/docs/resources/channel#allowed-mentions-object)
     * @param {Array} components  [Message-Component-Object](https://discord.com/developers/docs/interactions/message-components#component-object). ⚠ This will only work, if your webhook is owned by an application.
     * @return {Promise<Message>} New message
     */
    async edit(content, embeds = [], allowedMentions = {}, components = []) {
        const res = await centra(this.webhookUrl + `/messages/${this.id}`, 'PATCH').body({
            content: content,
            embeds: embeds,
            allowed_mentions: allowedMentions,
            components
        })
            .header('Content-Type', 'application/json')
            .send('form');
        if (res.statusCode === 204) throw new Error(`Something went wrong while editing the message ${this.id} with the webhook ${this.webhookUrl}. Here is the answer from discord: ` + res.body.toString());
        return new Message(JSON.parse(res.body.toString()), this.webhookUrl);
    }
}

module.exports.Message = Message;