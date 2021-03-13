const {Webhook} = require('../Webhook');

const webhook = new Webhook('https://discord.com/api/webhooks/820304489637871657/QPZWXNS6wUsQ7iKA-Sm7YDIODCbxk60WNeRDoPtEOxZaMvlqbrM_1LQ_LVZHMNhbdz6N');

webhook.send('This message should get edited (hopefully) soon').then(async (result) => {
    console.log('Successfully send new message!');

    await webhook.resolveMessageID('820311219432194068').edit(`I got edited!`);
    console.log('Successfully resolved messageID and edited message!');

    setTimeout(async () => {
        await result.edit('And should get deleted (hopefully) soon');
        console.log('Successfully edited send message!');
    }, 3000);
    setTimeout(async () => {
        await result.delete();
        console.log('Successfully deleted send message!');
    }, 6000);
});
