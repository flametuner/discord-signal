import {
  serve,
  type Handler,
} from "https://deno.land/std@0.168.0/http/server.ts";

import { Comment, Issue, LinearPayload } from "./types.ts";
import { getLinearIdFromUrl, isLinearRequest } from "./utils.ts";
import { LinearClient } from "./linear.ts";
import { getSupaUserFromWebhook } from "./supabase.ts";
import { sendDiscordMessage } from "./discord.ts";

const handler: Handler = async (req: Request) => {
  if (!isLinearRequest(req)) throw new Error("Not a Linear webhook");
  // get the linear id from the url
  const linearId = getLinearIdFromUrl(req.url).expect(
    "No linear id found in url"
  );

  const payload = (await req.json()) as LinearPayload;

  const { action, data, type, url: linearUrl } = payload;

  const { linear_token, discord_id } = (
    await getSupaUserFromWebhook(linearId)
  ).expect("No user found with that linear id");

  const client = LinearClient(linear_token ?? "");

  switch (type) {
    case "Comment": {
      const comment = data as Comment;
      const message = `${comment.user.name} ${action} ${type} on the issue "${comment.issue.title}": ${comment.body}. Link: ${linearUrl}`;
      await sendDiscordMessage(discord_id, message);
      break;
    }
    case "Issue": {
      const issue = data as Issue;
      const creator = await client.getUserById(issue.creatorId);
      const message = `${creator.name} ${action} ${type} on the issue [${issue.title}](${linearUrl})`;
      await sendDiscordMessage(discord_id, message);
      break;
    }
    default:
      console.log(payload);
      break;
  }

  return new Response();
};

serve(handler);
