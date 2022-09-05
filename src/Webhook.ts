import {WebhookError} from "./WebhookError";
import {Message} from './Message'
import {APIActionRowComponent, APIAllowedMentions, APIEmbed, APIMessageActionRowComponent} from 'discord-api-types/v10'

const centra = require('centra')

/**
 * Represents a webhook
 */
export class Webhook {
    url: URL;
    username?: String;
    avatarUrl?: String;

    /**
     * Represents a new webhook
     * @param {URL} url Webhook-URL
     * @param {String} username Username of the webhook
     * @param {URL} avatarUrl URL to a avatar
     */
    constructor(url: URL, username?: String, avatarUrl?: String) {
        this.url = url;
        this.username = username;
        this.avatarUrl = avatarUrl;
    }

    /**
     * Creates a new message as the webhook
     * @param {String} content Content of this message
     * @param {APIEmbed} embeds Array of [embeds](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIEmbed) attached to this message
     * @param {Object} allowedMentions  [Allowed-Mentions-Object](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIAllowedMentions)
     * @param {Boolean} tts If enabled, discord will read out the messages to everyone who has this channel open
     * @param {Array} components  Array of [Message-Component-Action-Rows](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIActionRowComponent). ⚠ Most components will only work, if the webhook is owned by an application.
     * @return {Promise<Message>} New message
     */
    async send(content: String, embeds: APIEmbed[] = [], allowedMentions: APIAllowedMentions = {}, tts = false, components: APIActionRowComponent<APIMessageActionRowComponent>[] = []) {
        const res = await centra(this.url + '?wait=true', 'POST').body({
            content: content,
            username: this.username,
            avatar_url: this.avatarUrl,
            tts: tts,
            embeds: embeds,
            allowed_mentions: allowedMentions,
            components
        })
            .header('Content-Type', 'application/json')
            .send();
        if (res.statusCode !== 200) throw new WebhookError(JSON.parse(res.body.toString()));
        return new Message(JSON.parse(res.body.toString()), this.url);
    }

    /**
     * Edits this webhook object
     * @param {String} name New username of the webhook
     * @param {String} base64Avatar [Base64](https://en.wikipedia.org/wiki/Base64)-String of your image. If you don't know how to use this, please google Image to Base64 nodejs or File to Base 64 if you have an image file.
     * @return {Promise<void>}
     */
    async edit(name?: String, base64Avatar?: String) {
        const res = await centra(this.url, 'PATCH').body({
            name,
            avatar: base64Avatar ? `data:image/jpeg;base64,${base64Avatar}` : null
        })
            .header('Content-Type', 'application/json')
            .send();
        if (res.statusCode !== 200) throw new WebhookError(JSON.parse(res.body.toString()));
    }

    /**
     * Deletes this message
     * @return {Promise}
     */
    async delete() {
        const res = await centra(this.url, 'DELETE').send();
        if (res.statusCode !== 204) throw new WebhookError(JSON.parse(res.body.toString()));
    }

    /**
     * Fetches a message by ID (including content)
     * @param {String} id ID of the message
     * @return {Promise<Message>} Message
     */
    async fetchMessage(id) {
        const res = await centra(this.url + `/messages/${id}`, 'GET')
            .send();
        if (res.statusCode !== 200) throw new WebhookError(JSON.parse(res.body.toString()));
        return new Message(JSON.parse(res.body.toString()), this.url)
    }

    /**
     * Resolves a message by ID (will not include any content of this message. Only use this if you want to edit or delete already send messages without having to fetch the message again
     * @param messageID
     * @return {Message}
     */
    resolveMessageID(messageID) {
        return new Message({id: messageID}, this.url);
    }
}