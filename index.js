const TelegramBot = require('node-telegram-bot-api');
const SocksAgent = require('socks5-https-client/lib/Agent');
const BOT_TOKEN = '928352753:AAG5pLdxljtl4bPXer-q_UdQKBNHtNvflx0';

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true,
    request: {
        agentClass: SocksAgent,
        agentOptions: {
            socksHost: "grsst.s5.opennetwork.cc",
            socksPort: 999,
            socksUsername: '265415615',
            socksPassword: "e6IkKEtl"
        }
    }
});

var respData = {
    title: 'Сколько параметров можно передать функции ?',
    buttons: [
        [{
            text: 'Ровно столько, сколько указано в определении функции.Ровно столько, \n сколько указано в определении функции.Ровно столько,\n сколько указано в определении функции.',
            callback_data:  JSON.stringify({dialogId: 0, answerId: 0})
        }],
        [{
            text: 'Сколько указано в определении функции или меньше.',
            callback_data:  JSON.stringify({dialogId: 0, answerId: 1})
        }],
        [{
            text: 'Сколько указано в определении функции или больше.',
            callback_data:  JSON.stringify({dialogId: 0, answerId: 2})
        }],
        [{
            text: 'Любое количество.',
            callback_data: JSON.stringify({dialogId: 0, answerId: 3})
        }]
    ],
    next: 4
};

bot.onText(/\/start/, function (msg) {
    start(msg);
});
// Ответ от кнопок
bot.on('callback_query', function (msg) {
    const data = JSON.parse(msg.data);
    onDialogChoosen(msg.from.id, data.dialogId, data.answerId);
});


function start(msg) {
    var arr = respData; // Получаем случайный вопрос
    var options = {
        reply_markup: JSON.stringify({
            resize_keyboard: true,
            inline_keyboard: arr.buttons, // Добавляем кнопки, которые есть в вопросе.
        })
    };
    var chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id; // Если сообщение отправлял пользователь, то свойство msg.chat.id, если же он кликал на кнопку, то msg.from.id
    bot.sendMessage(chat, arr.title, options); // Отправляем пользователю сообщение: id пользователя, текст вопроса, кнопки.
}

function onDialogChoosen(from, dialogId, answerId) {
    bot.sendMessage(from, `диалог ${dialogId} ответ ${answerId}`);
}
