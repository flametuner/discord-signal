import { Database } from "@/types/supabase";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";

export type User = Database['public']['Tables']['user']['Row'];

export function useSupaUser() {
  const client = useSupabaseClient<Database>();
  const user = useUser();
  return useQuery<User>(
    "user",
    async () => {
      if (!user?.id) throw new Error("No user id");
      const { data, error } = await client
        .from("user")
        .upsert(
          { email: user?.email, id: user.id, discord_id: user.user_metadata.provider_id },
          {
            onConflict: "email",
          }
        )
        .select("*");
      if (error) throw new Error(error.message);
      return data[0] as User;
    },
    {
      enabled: !!client && !!user?.id,
    }
  );
}
