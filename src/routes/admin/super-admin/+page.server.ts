import type {PageServerLoad} from './$types';
import type {AirtableUser, User, UserCurrency} from "$lib/types"
import { getAllUsers } from '$lib/db';
const filterPII = (userData: AirtableUser): User => {
    return {
        email: userData.fields.email,
        currency: userData.fields.currency
    }
}
export const load: PageServerLoad = async ({cookies}) => {
    const userRespone = await getAllUsers()
    const userData = await userRespone.json()

    return {userData: userData.records}
}