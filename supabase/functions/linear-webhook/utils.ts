import {
  Some,
  None,
  Option,
} from "https://deno.land/x/optionals@v3.0.0/mod.ts";
import { LINEAR_IPS } from "./consts.ts";

function ips(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(/\s*,\s*/);
}

export function isLinearRequest(req: Request) {
  const clientIps = ips(req);
  if (!clientIps) return false;
  let isLinear = false;
  for (const ip of clientIps) {
    if (LINEAR_IPS.includes(ip)) {
      isLinear = true;
      break;
    }
  }
  return isLinear;
}

export function getLinearIdFromUrl(urlStr: string): Option<string> {
  const url = new URL(urlStr);
  const linearId = url.pathname.replace("/linear-webhook/", "");
  if (!linearId) return None();
  return Some(linearId);
}
