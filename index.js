const TelegramBot = require('node-telegram-bot-api')
const dialogflow = require('./dialogflow')
const youtube = require('./youtube.js')

const token = '1603880383:AAET6_OgYftY9ETui2l7P_2RHP6sEJkPVG8'

const bot = new TelegramBot(token, { polling:true});

bot.on('message', async  function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

  
    const dfResponse = await dialogflow.sendMenssage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;

    if(dfResponse.intent == "Treino especifico"){
        responseText =  await youtube.searchVideoURL(responseText, dfResponse.fields.stringValue) 
    }
    bot.sendMessage(chatId, responseText);
})