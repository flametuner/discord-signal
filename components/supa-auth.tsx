import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";


export function SupaAuth() {
    const supabaseClient = useSupabaseClient();
    return <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={['discord']}
        onlyThirdPartyProviders={true}
        redirectTo="http://localhost:3000/"
    />
}