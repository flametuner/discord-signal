import { LoginButtons } from "@/components/login-buttons";
import { SupaAuth } from "@/components/supa-auth";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();

  if (!user)
    return (
      <SupaAuth />
    )
  return <>
    <LoginButtons />
  </>
}
