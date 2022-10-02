import {RESTError} from "discord-api-types/v10";
import {Webhook} from "./Webhook";

interface APIError {
    code: number,
    message: string
}

export class WebhookError extends Error implements RESTError {
    code: number;
    message: string;

    constructor(data: APIError) {
        super(`Error: ${data.message}`);
        this.code = data.code;
        this.message = data.message;
        Object.setPrototypeOf(this, Webhook.prototype);
    }
}