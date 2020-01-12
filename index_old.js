const Telegraf = require('telegraf');
const SocksAgent = require('socks5-https-client/lib/Agent');

const socksAgent = new SocksAgent({
    socksHost: "orbtl.s5.opennetwork.cc",
    socksPort: 999,
    socksUsername: "265415615",
    socksPassword: "e6IkKEtl",
});
const BOT_TOKEN = '928352753:AAG5pLdxljtl4bPXer-q_UdQKBNHtNvflx0';

const bot = new Telegraf(BOT_TOKEN, {
    telegram: {
        agent: socksAgent
    }
});


const testMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Ожидали посадочные талоны практически до завершения посадки, вследствие чего были вынуждены прибегнуть к услуге платной регистрации в аэропорту.', 'r'),
        m.callbackButton('24 декабря в чате объяснили данную ситуацию оператору и запросили возврат средств. Оператор запросил квитанцию об оплате услуги.', 's'),
        m.callbackButton('Бумага', 'p')
    ]).extra());
bot.start((ctx) => ctx.reply("123", testMenu));
// bot.action('r', (ctx) => game(ctx));
// bot.action('p', (ctx) => game(ctx));
// bot.action('s', (ctx) => game(ctx));

bot.launch();



// bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();