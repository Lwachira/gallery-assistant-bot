import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), (ctx) => {
  return ctx.reply(ctx.t("welcome"));
});

feature.command("image", logHandle("command-image"), (ctx) => {
  return ctx.reply(ctx.t("image"));
});

export { composer as welcomeFeature };
