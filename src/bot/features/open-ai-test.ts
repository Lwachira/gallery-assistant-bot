import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { createDefaultKeyboard } from "../keyboards/default-keyboard.js";
// import OpenAI from "openai";
// import { config } from "#root/config.js";

// // const openai = new OpenAI({
// //   apiKey: config.OPENAI_API_KEY,
// // });

// // const chatCompletion = await openai.chat.completions.create({
// //   messages: [{ role: "user", content: "Say this is a test" }],
// //   model: "gpt-3.5-turbo",
// // });

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("aitest", logHandle("command-ai-test"), async (ctx) => {
  return ctx.reply("AI text goes here");
});

feature.on("message:photo", logHandle("on-ai-photo-input"), async (ctx) => {
  await ctx.reply("What would you like to do with the photo", {
    reply_markup: await createDefaultKeyboard(ctx),
  });
});

feature.callbackQuery(
  "save_to_db",
  logHandle("command-save_to_db"),
  async (ctx) => {
    const pic = ctx.msg?.photo?.at(0);
    const fileId = pic?.file_id;

    return ctx.answerCallbackQuery({
      text: `The file identifier of your photo message is: ${fileId}`,
    });
  },
);

export { composer as aiTestFeature };

/* 

import { Bot, InlineKeyboard } from "grammy";

const { BOT_TOKEN: token = "" } = process.env;

// Set your token in the vercel environment variable
export const bot = new Bot(token);

// attach all middleware

bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help text" },
  { command: "settings", description: "Open settings" },
]);

bot.command("start", async (ctx) => {
  await ctx.reply("Welcome! Send me a photo!");
});

bot.callbackQuery("save_to_db", async (ctx) => {
  await ctx.answerCallbackQuery({ text: "Saved to db" });
});

bot.on("message:photo", async (ctx) => {
  await ctx.reply("What would you like to do with the photo", {
    reply_markup: keyboard,
  });
});

bot.on("edited_message", async (ctx) => {
  await ctx.reply("Ha! Gotcha! You just edited this!", {
    reply_parameters: { message_id: ctx.editedMessage.message_id },
  });
}); */
