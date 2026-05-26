import type { PageServerLoad } from './$types';
import jwt from "jsonwebtoken"
import {ADMIN_JWT_SECRET} from "$env/static/private"
import { redirect } from "@sveltejs/kit"
interface TokenPayload extends jwt.JwtPayload {
    name?: string;
}
export const load: PageServerLoad = async ({cookies}) => {
    const adminAccessToken = cookies.get("admin_access_token")
    const adminJwt = cookies.get("admin_jwt")
    if (!adminAccessToken || !adminJwt) {
        throw redirect(303, "/admin/login")
    }
    
    jwt.verify(adminJwt, ADMIN_JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Invalid JWT:", err)
            throw redirect(303, "/admin/login")
        }
        const token = decoded as TokenPayload;
        return {
            isAdmin: true,
            name: token.name || null,
        }
    })
    return {
        isAdmin: true,
        name: null,
    }
}