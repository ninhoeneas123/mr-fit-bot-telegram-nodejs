const TelegramBot = require('node-telegram-bot-api')
const dialogflow = require('./dialogflow')
const youtube = require('./youtube.js')

const token = '1643569813:AAHIxwWqEPnInoJULR_gX_Hkb0DkKhJmQgM'

const bot = new TelegramBot(token, { polling:true});

bot.on('message', async  function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

  
    const dfResponse = await dialogflow.sendMenssage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;

    if(dfResponse.intent == "Treino especifico"){
        responseText =  await youtube.searchVideoURL(responseText, dfResponse.fields.Corpo.stringValue); 
    }
    bot.sendMessage(chatId, responseText);
})