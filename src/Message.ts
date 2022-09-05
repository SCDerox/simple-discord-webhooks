import {Snowflake} from "discord-api-types/globals";
import {
    APIActionRowComponent,
    APIAllowedMentions,
    APIAttachment,
    APIChannelMention,
    APIEmbed,
    APIMessage,
    APIMessageActionRowComponent,
    APIMessageActivity,
    APIUser,
    MessageFlags,
    MessageType
} from "discord-api-types/v10";
import {WebhookError} from "./WebhookError";

const centra = require('centra');

/**
 * Represents a discord-message
 */
export class Message implements APIMessage {
    id: Snowflake;
    webhookUrl: URL;

    channel_id: string;
    author: APIUser;
    content: string;
    timestamp: string;
    edited_timestamp: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: APIUser[];
    mention_roles: string[];
    mention_channels?: APIChannelMention[];
    attachments: APIAttachment[];
    embeds: APIEmbed[];
    pinned: boolean;
    webhook_id?: string;
    type: MessageType;
    activity?: APIMessageActivity;
    flags?: MessageFlags;
    components?: APIActionRowComponent<APIMessageActionRowComponent>[];

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
            .send();
        if (res.statusCode !== 204) throw new WebhookError(JSON.parse(res.body.toString()));
        return true;
    }

    /**
     * Edits this message
     * @param {String} content Content of this message
     * @param {APIEmbed} embeds Array of [embeds](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIEmbed) attached to this message
     * @param {Object} allowedMentions  [Allowed-Mentions-Object](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIAllowedMentions)
     * @param {Array} components  Array of [Message-Component-Action-Rows](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIActionRowComponent). ⚠ Most components will only work, if the webhook is owned by an application.     * @return {Promise<Message>} New message
     */
    async edit(content, embeds: APIEmbed[] = [], allowedMentions: APIAllowedMentions = {}, components: APIActionRowComponent<APIMessageActionRowComponent>[] = []) {
        const res = await centra(this.webhookUrl + `/messages/${this.id}`, 'PATCH').body({
            content: content,
            embeds: embeds,
            allowed_mentions: allowedMentions,
            components
        })
            .header('Content-Type', 'application/json')
            .send();
        if (res.statusCode === 204) throw new WebhookError(JSON.parse(res.body.toString()));
        return new Message(JSON.parse(res.body.toString()), this.webhookUrl);
    }
}