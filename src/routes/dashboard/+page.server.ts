import type { PageServerLoad } from './$types';
import { START_DATE, SLACK_BOT_TOKEN } from '$env/static/private';
import { getProjectsByOwner, getUserByEmail } from '$lib/db';
import { WebClient } from "@slack/web-api"
import jwt from "jsonwebtoken"
let slackClient: WebClient = new WebClient(SLACK_BOT_TOKEN);
const getSlackProfile = async (slackId: string) => {
    const result = await slackClient.users.info({ user: slackId });

    return result.user?.profile || null;
}

export const load: PageServerLoad = async ({ cookies }) => {
    const at = cookies.get('access_token_new');
    const hackatimeVerified = cookies.get('hackatime_verified');
    const userToken = cookies.get("user_token")
    let decodedToken: any = null
    try {
        if (userToken) {
            const decoded: any = jwt.decode(userToken);
            decodedToken = decoded
        } else {
            throw new Error("No user token found");
        }
    }catch (error) {
        console.error("Error decoding user token:", error);
        throw new Error("Invalid user token");
    }


    let hackatimeAccessToken = cookies.get('hackatime_token');
    let hacks = ""
    if (hackatimeAccessToken) {

        let hackatimes = await fetch(`https://hackatime.hackclub.com/api/v1/authenticated/projects?include_archived=false&start=${START_DATE}`, {
            headers: {
                Authorization: `Bearer ${hackatimeAccessToken}`,
                "Content-Type": 'application/json'
            }
        })
        hacks = await hackatimes.json()

    }

    if (!at) {
        return {
            projects: []
        }
    }
    let projectsResponse = await getProjectsByOwner(decodedToken.email);
    let userResponse = await getUserByEmail(decodedToken.email);

    const projectsData = await projectsResponse.json();
    const userData = await userResponse.json();
    let admin = false
    if (cookies.get("admin_access_token")) {
        admin = true
    }
    let slackprofile = await getSlackProfile(decodedToken.slack_id)

    return {
        projects: projectsData.records,
        hacks: hacks,
        email: decodedToken.email,
        eligiblity: decodedToken.ysws_eligible,
        name: slackprofile?.display_name || decodedToken.first_name,
        hackatimeVerified: hackatimeVerified === "true",
        user: userData.records?.[0]?.fields ?? {},
        admin: admin,
        pfp: slackprofile?.image_512 || ""
    }
};