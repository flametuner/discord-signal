import { useSupaUser } from "@/lib/useSupaUser";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Card } from "./card";
import { InformativeCheckbox } from "./checkbox";
import { LinearLoginButton } from "./linear-login";
import { PrimaryButton } from "./primary-button";


type UserProps = {
    primaryEmailAddress: string;
}


export function LoginButtons() {
    const { status, error, data } = useSupaUser();
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const logout = () => supabaseClient.auth.signOut();
    if (status == 'loading') return <>Loading</>;
    if (status == 'error') return <>Error: {error}</>;
    return <div className="flex items-center justify-center h-screen">

        <Card className="max-w-xs flex flex-col justify-between px-3 py-1">
            <div className="flex justify-between">
                <p>
                    User: {user?.user_metadata?.full_name || user?.email || user?.id}
                </p>
                <PrimaryButton onClick={logout}>
                    Logout
                </PrimaryButton>
            </div>
            <div className="flex justify-center w-full py-3 flex-col items-center">
                <InformativeCheckbox checked={!!data?.linear_id} text="Linear Connected" />
                <InformativeCheckbox checked={!!data?.webhook_id} text="Webhook Connected" />
                <LinearLoginButton />
            </div>
        </Card>
    </div>

}