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

feature.on("message:photo", async (ctx) => {
  await ctx.reply("What would you like to do with the photo", {
    reply_markup: await createDefaultKeyboard(ctx),
  });
});

export { composer as aiTestFeature };
