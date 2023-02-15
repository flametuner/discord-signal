import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQuery } from "react-query";

export type User = {
  id: number;
  email: string;
  discordId?: string;
  linearId?: string;
};

export function useLinearUpdate({ linearId }: { linearId: string }) {
  const client = useSupabaseClient();
  const user = useUser();
  return useMutation<User>("user", async () => {
    const { data, error } = await client
      .from("user")
      .update({ id: user?.id, discord_id: linearId })
      .select("*");
    if (error) throw new Error(error.message);
    return data[0] as User;
  });
}
