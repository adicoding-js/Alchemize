import type { RequestHandler } from "@sveltejs/kit"
import {upsertAdmin} from "$lib/db"
import {WebClient} from "@slack/web-api"
import { SLACK_BOT_TOKEN } from "$env/static/private"
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
export const POST: RequestHandler = async ({request}) => {
    const data = await request.json()
    let {email, isReviewer, isSuperAdmin, isFulfiller, isT2Reviewer, slackId, nda} = data
    const roles = rolesToRoleString(isReviewer, isSuperAdmin, isFulfiller, isT2Reviewer)
    const name = await getUserName(slackId)
    const result = await upsertAdmin(slackId, email, roles, name, nda)
    return new Response(JSON.stringify({ok: result.ok}), {status: result.ok ? 200 : 500})
}