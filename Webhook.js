const centra = require('@aero/centra');
const {Message} = require('./Message');

class Webhook {
    constructor(url, username = null, avatarUrl = null) {
        this.url = url;
        this.username = username;
        this.avatarUrl = avatarUrl;
    }

    async send(content, embeds = [], allowedMentions = {}, tts = false, components = []) {
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
            .send('form');
        if (res.statusCode !== 200) {
            console.error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: `, res.body.toString());
            return false;
        }
        return new Message(JSON.parse(res.body.toString()), this.url);
    }

    async edit(name = null, base64Avatar = null) {
        const res = await centra(this.url, 'PATCH').body({
            name,
            avatar: base64Avatar ? `data:image/jpeg;base64,${base64Avatar}` : null
        })
            .header('Content-Type', 'application/json')
            .send('form');
        if (res.statusCode !== 200) {
            console.error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: `, res.body.toString());
            return false;
        }
    }

    async delete() {
        const res = await centra(this.url, 'DELETE').body().send('form');
        if (res.statusCode !== 204) {
            console.error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: `, res.body.toString());
            return false;
        }
    }

    async fetchMessage(id) {
        const res = await centra(this.url + `/messages/${id}`, 'GET')
            .send('form');
        if (res.statusCode !== 200) {
            console.error(`Something went wrong while sending while sending the webhook ${this.url}. Here is the answer from discord: `, res.body.toString());
            return false;
        }
        return new Message(JSON.parse(res.body.toString()), this.url)
    }

    resolveMessageID(messageID) { // YOU CAN NOT GET ANY CONTENT OF A MESSAGE VIA THIS METHOD. YOU CAN *ONLY* USE THIS TO EDIT / DELETE ALREADY SEND MESSAGES
        return new Message({id: messageID}, this.url);
    }
}

module.exports.Webhook = Webhook;