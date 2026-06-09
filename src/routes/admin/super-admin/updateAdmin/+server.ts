import type { RequestHandler } from "@sveltejs/kit"
import {upsertAdmin} from "$lib/db"
import {WebClient} from "@slack/web-api"
import { SLACK_BOT_TOKEN } from "$env/static/private"
import jwt from "jsonwebtoken"
const webClient = new WebClient(SLACK_BOT_TOKEN)
const rolesToRoleString = (isReviewer:boolean, isSuperAdmin:boolean, isFulfiller:boolean, isT2Reviewer:boolean) => {
    let roles = ""
    if (isReviewer) roles += "reviewer,"
    if (isSuperAdmin) roles += "super_admin,"
    if (isFulfiller) roles += "fulfiller,"
    if (isT2Reviewer) roles += "t2_reviewer,"
    return roles
}
const getUserName = async (userId:string) => {
    try {
        const result = await webClient.users.info({ user: userId });
        return result.user?.profile?.display_name || "Unknown User";
    }
    catch (error) {
        console.error("Error fetching user info from Slack:", error);
        return "Unknown User";
    }
}
export const POST: RequestHandler = async ({request, cookies}) => {
    const data = await request.json()
    try{
        const token = cookies.get("admin_jwt")
        if(!token) return new Response(JSON.stringify({ok: false, error: "Unauthorized"}), {status: 401})
        let decoded = jwt.verify(token, SLACK_BOT_TOKEN) as {email: string, roles: string}
        if(!decoded.roles.includes("super_admin")) return new Response(JSON.stringify({ok: false, error: "Forbidden"}), {status: 403})
    }catch(error){
        console.error("JWT verification failed:", error)
        return new Response(JSON.stringify({ok: false, error: "Forbidden"}), {status: 403})
    }
    let {email, isReviewer, isSuperAdmin, isFulfiller, isT2Reviewer, slackId, nda} = data
    const roles = rolesToRoleString(isReviewer, isSuperAdmin, isFulfiller, isT2Reviewer)
    const name = await getUserName(slackId)
    const result = await upsertAdmin(slackId, email, roles, name, nda)
    return new Response(JSON.stringify({ok: result.ok}), {status: result.ok ? 200 : 500})
}