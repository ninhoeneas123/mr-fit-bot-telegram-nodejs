const dialogflow = require('dialogflow');
const configs = require('./agente-telegram-ebq9-d42819d9d79a.json');

const sessionClient = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials:{
        private_key: configs.private_key,
        client_email: configs.client_email
    }
});
async function sendMenssage(chatId, message){
    const sessionPath = sessionClient.sessionPath(configs.project_id, chatId)
    const request = {
        session: sessionPath,
        queryInput : {
            text: {
                text: message,
                languageCode: 'pt-BR'
            }
        }

    }
    const response = await sessionClient.detectIntent(request)
    const result = response[0].queryResult;
    return {
         text: result.fulfillmentText,
         intent: result.intent.displayName,
         fields: result.parameters.fields
    };
}

module.exports.sendMenssage = sendMenssage;