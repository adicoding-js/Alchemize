import { error } from "@sveltejs/kit"
import jwt from "jsonwebtoken"
import { ADMIN_JWT_SECRET } from "$env/static/private"
import type { RequestHandler } from "./$types";
import type { Log,  AdminJWT } from "$lib/types";


export const POST: RequestHandler = async ({ request, cookies }) => {
        const adminJWTToken = cookies.get("admin_jwt")
        if (!adminJWTToken) {
            return error(401, "Unauthorized")
        }
        let decoded: AdminJWT
        try {
            decoded = jwt.verify(adminJWTToken, ADMIN_JWT_SECRET) as AdminJWT
            if (!decoded.isReviewer) {
                return error(401, "Unauthorized")
            }
        } catch (err) {
            return error(401, "Unauthorized")
        }
        const approver = decoded.name
}