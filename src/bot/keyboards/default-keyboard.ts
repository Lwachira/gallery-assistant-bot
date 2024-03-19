import { InlineKeyboard } from "grammy";
import type { Context } from "#root/bot/context.js";

export const createDefaultKeyboard = async (_ctx: Context) => {
  const labelDataPairs = [["Save to database", "save_to_db"]];
  const buttonRow = labelDataPairs.map(([label, data]) =>
    InlineKeyboard.text(label, data),
  );

  return InlineKeyboard.from([buttonRow]);
};
