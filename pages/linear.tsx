import { Database } from "@/types/supabase";
import { LinearClient } from '@linear/sdk';
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";


export default function Linear() { }

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { code } = ctx.query;
    if (!code) return {
        notFound: true
    }
    const params = {
        client_id: process.env.NEXT_PUBLIC_LINEAR_CLIENT_ID || "",
        client_secret: process.env.LINEAR_CLIENT_SECRET || "",
        redirect_uri: 'http://localhost:3000/linear',
        grant_type: 'authorization_code',
        code: code.toString(),

    }
    const url = "https://api.linear.app/oauth/token";
    const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams(params)
    })
    const { access_token } = await response.json();
    // Create authenticated Supabase Client
    const client = createServerSupabaseClient<Database>(ctx);
    // Check if we have a session

    const {
        data: { session },
    } = await client.auth.getSession()

    if (!session)
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    const { data: users, error } = await client
        .from("user")
        .select("*").eq('id', session.user.id);

    if (error) {
        return {
            notFound: true
        }
    }
    const user = users[0];

    const linearClient = new LinearClient({ accessToken: access_token });
    const me = await linearClient.viewer;

    const webhookPayload = {
        resourceTypes: ['Comment', 'Issue', 'Reaction'],
        url: `https://smijvpbhskeqwuoymihg.functions.supabase.co/linear-webhook/${me.id}`,
        enabled: true,
        label: 'Discord Notification System'
    }

    let webhook_id;
    if (user.webhook_id) {
        const webhook = await linearClient.webhook(user.webhook_id)
        await webhook.update(webhookPayload);
        webhook_id = user.webhook_id;
    } else {
        const payload = await linearClient.createWebhook({ ...webhookPayload, allPublicTeams: true, })
        const webhook = await payload.webhook;
        webhook_id = webhook?.id;
    }

    await client.from("user").update({
        linear_id: me.id,
        webhook_id,
        linear_token: access_token
    }).eq('id', session.user.id);

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
}