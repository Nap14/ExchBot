import { Telegraf } from "telegraf"
import * as dotenv from "dotenv"
dotenv.config();

const BASE_URL = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}`

const bot = new Telegraf(process.env.BOT_TOKEN);
const freeBot = []

bot.start(
  (ctx) => ctx.reply('Welcome!')
)

bot.help((ctx) => {
  console.log(ctx.message.text)
  ctx.reply("I don`t know")
})

bot.command("hello", (ctx) => {
  ctx.reply("Hello");
})

bot.command("name", (ctx) => {
  ctx.reply(ctx.chat.first_name + (ctx.chat.last_name || ""))
})

bot.command("exch", async (ctx) => {
  const message = ctx.message.text;
  const [_, sum, from, to] = message.split(" ")
  

  const response = await fetch(BASE_URL+`/latest/${from}`);
  const { conversion_rates } = await response.json();


  ctx.reply(conversion_rates[to] * sum)
  
})

bot.on("message", (ctx) => {
  if (!freeBot.includes(ctx.chat.id)) {
    if (ctx.message.text.includes("дякую")) {
      ctx.reply("Ти відпустив мене на свободу")
      freeBot.push(ctx.chat.id)
    }
    ctx.reply(ctx.message.text)
  }
})


bot.launch(() => {
  console.log("Bot started")
})