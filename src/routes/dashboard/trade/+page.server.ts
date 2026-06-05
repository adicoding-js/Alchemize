import { getUserByEmail } from "$lib/db"
import type { UserCurrency } from "$lib/types";
import type { PageServerLoad } from "./$types";
import looseJson from "loose-json"

export const load: PageServerLoad = async ({ cookies }) => {
    const at = cookies.get('access_token_new');

    const fetchRes = await fetch("https://auth.hackclub.com/api/v1/me", {
        headers: {
            Authorization: `Bearer ${at}`,
        },
        method: "GET"
    })

    const data = await fetchRes.json()
    if (!fetchRes.ok) {
        return {
            error: data?.message ?? "Failed to fetch user data"
        }
    }
    let userResponse = await getUserByEmail(data.identity.primary_email);
    let userData = await userResponse.json();
    let user = userData.records[0].fields
    let userCurrencies = 
		looseJson(user.currency ?? "{}") as UserCurrency
    return {
        currencies: userCurrencies,
    }
}