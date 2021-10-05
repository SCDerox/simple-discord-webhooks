const centra = require('@aero/centra');

class Message {
    constructor(messageData, webhookurl) {
        this.webhookUrl = webhookurl;
        for (const data in messageData) {
            this[data] = messageData[data];
        }
    }

    async delete() {
        const res = await centra(this.webhookUrl + `/messages/${this.id}`, 'DELETE')
            .header('Content-Type', 'application/json')
            .send('form');
        if (res.statusCode !== 204) {
            console.error(`Something went wrong while deleting the message ${this.id} with the webhook ${this.webhookUrl}. Here is the answer from discord: `, res.body.toString());
            return false;
        }
        return true;
    }

    async edit(content, embeds = [], allowedMentions = {}, components = []) {
        const res = await centra(this.webhookUrl + `/messages/${this.id}`, 'PATCH').body({
            content: content,
            embeds: embeds,
            allowed_mentions: allowedMentions,
            components
        })
            .header('Content-Type', 'application/json')
            .send('form');
        if (res.statusCode === 204) {
            console.error(`Something went wrong while editing the message ${this.id} with the webhook ${this.webhookUrl}. Here is the answer from discord: `, res.body.toString());
            return false;
        }
        return new Message(JSON.parse(res.body.toString()), this.webhookUrl);
    }
}

module.exports.Message = Message;