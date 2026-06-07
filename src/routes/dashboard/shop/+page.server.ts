import type { PageServerLoad } from './$types';
import itemsJson from "./items.json"
import type { Item } from "$lib/types"
import { getUserByEmail } from '$lib/db';
import jwt from 'jsonwebtoken';
import {USER_JWT_SECRET} from '$env/static/private';
export const load: PageServerLoad = async ({ cookies }) => {
    const items: Item[] = itemsJson as Item[];
    const at = cookies.get('access_token_new');
    const userToken = cookies.get('user_token');
    
    let data: any = null;
    if (userToken) {
        try {
            data = jwt.verify(userToken, USER_JWT_SECRET);
        }
        catch (err) {
            console.error("Error verifying JWT:", err);
        }
    }
    const email = data?.email;
    const userResponse = await getUserByEmail(email);

  
    const userData = await userResponse.json();
    const userRecord = userData.records[0];
    console.log(userRecord);
    return {
        items,
        userRecord
    }
}