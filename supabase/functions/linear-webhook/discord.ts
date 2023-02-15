import {
  createBot,
  Intents,
  Embed,
  sendMessage,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { getDmChannel } from "https://deno.land/x/discordeno@18.0.1/helpers/mod.ts";

export async function sendDiscordMessage(discordId: string, message: string) {
  const bot = createBot({
    token: Deno.env.get("DISCORD_TOKEN") ?? "",
    intents: Intents.DirectMessages,
  });
  const channel = await getDmChannel(bot, discordId);
  const embed: Embed = {
    // title: "Linear",
    description: message,
    // url: "https://linear.app",
  };

  await sendMessage(bot, channel.id, {
    // content: message,
    embeds: [embed], // new Embeds
  });
}
