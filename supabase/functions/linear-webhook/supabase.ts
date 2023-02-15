import {
    None,
    Option,
    Some
} from "https://deno.land/x/optionals@v3.0.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Database } from "../_shared/types/supabase.ts";
import { SupabaseUser } from "./types.ts";

function createSupabaseClient() {
  return createClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_KEY") ?? ""
  );
}

export async function getSupaUserFromWebhook(
  webhookId: string
): Promise<Option<SupabaseUser>> {
  const client = createSupabaseClient();
  const { data: users } = await client
    .from("user")
    .select("*")
    .eq("linear_id", webhookId);

  if (!users || users.length == 0) return None();
  return Some(users[0]);
}
