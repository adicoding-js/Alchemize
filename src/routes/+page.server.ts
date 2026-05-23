import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";
const XORdecrypt = (textInp: string) => {
    const tb = Buffer.from(textInp, 'base64');
    const kb = Buffer.from(env.USERID_ENCRYPTION_KEY, "hex");
    const out = Buffer.alloc(tb.length)

    for (let i = 0; i < tb.length; i++) {
        out[i] = tb[i] ^ kb[i % kb.length]
    }
    return out.toString('utf-8');
}
const verifyReferCode: (code: string) => boolean = (code: string) => {
    if (code === ""){
        return false
    }
    console.log("Refer code from Func:", code)

    const userId = XORdecrypt(code).split(' ')[0]
    const slackId = XORdecrypt((code)).split(' ')[1]
    if (!slackId.startsWith("U") || !userId || !slackId || userId.startsWith("ident!")) {
        return false
    }
    return true
}   

export const load: PageServerLoad = async ({ url, cookies }) => {
    let refer = url.searchParams.get("refer") || null
    const valid = verifyReferCode(refer || "")
    if (refer && !valid) {
        return {
            error: "Invalid referral code."
        }
    }
    if (refer != null && valid) {
        cookies.set("refer", refer, { maxAge: 60 * 60 * 24 * 10, path: "/" })

    }

}