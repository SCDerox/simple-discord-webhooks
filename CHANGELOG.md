# Changelog
## v1.1.0 (October 5, 2021)
* Added support for [`PATCH /webhooks/{webhook.id}/{webhook.token}` Discord-API-Call](https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token): You can now modify the username or avatar of your webhook user 
* Added support for [`DELETE /webhooks/{webhook.id}/{webhook.token}` Discord-API-Call](https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token): You can now delete your webhook
* Added support for [`GET https://discord.com/developers/docs/resources/webhook#edit-webhook-message` Discord-API-Call](https://discord.com/developers/docs/resources/webhook#get-webhook-message): You can now fetch an already sent webhook message (including content)
* Added support for [Message-Component-Object](https://discord.com/developers/docs/interactions/message-components#component-object). ⚠ This will only work, if your webhook is owned by an application.

## v1.0.1 (March 13, 2021))
* Fixed bug: The module should *actually* work now. 

## v1.0.0 (March 13, 2021)
* 🚀 Initial commit