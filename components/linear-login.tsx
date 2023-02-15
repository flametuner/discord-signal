import Link from "next/link";
import { PrimaryButton } from "./primary-button";


export function LinearLoginButton() {
    const redirectUrl = `https://linear.app/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_LINEAR_CLIENT_ID}&redirect_uri=http://localhost:3000/linear&response_type=code&scope=write`;
    return <PrimaryButton href={redirectUrl}>
        Login with Linear
    </PrimaryButton>
}