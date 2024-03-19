import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import OpenAI from "openai";
import { config } from "#root/config.js";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Say this is a test" }],
  model: "gpt-3.5-turbo",
});
const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("aitest", logHandle("command-start"), async (ctx) => {
  const response =
    chatCompletion.choices.at(0)?.message.content?.toString() ??
    "Default response if undefined or null";
  return ctx.reply(ctx.t(response));
});

export { composer as aiTestFeature };
