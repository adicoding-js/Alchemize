import type { Log, Project, AdminJWT } from "$lib/types"
import jwt from "jsonwebtoken"
import {ADMIN_JWT_SECRET, AIRTABLE, AIRTABLE_CLIENT} from "$env/static/private"
import type { RequestHandler } from "@sveltejs/kit"
import {error} from "@sveltejs/kit"
import { patchProjectForShip } from "$lib/db"
import { updated } from "$app/state"
function updateLog(log: Log[], deltaTime: number, userExternal: string, name: string, internalNote: string, justification: string): Log[] {

    if (log.length === 0) {
        throw new Error("Log is empty")
    }
    const lastLog = log[log.length - 1]

        const newDeltaTime = lastLog.deltaTime - deltaTime
        return [...log.slice(0, -1), {
            ...lastLog,
            status: 2,
            timestamp: new Date().toISOString(),
            deltaTime: newDeltaTime,
            message: [...lastLog.message, { userExternal: userExternal, internalNote: internalNote, justification: justification, timestamp: new Date().toISOString(), reviewerName: name }],
            submmitedToHQ: false
        }]
   

}
export const POST: RequestHandler = async ({ request,cookies }) => {
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
    const {recordId, log, userExternal, internalNote, justification, decreaseTime} = await request.json()
    if (!recordId || !log || !userExternal  || !justification) {
        return error(400, "Missing required fields")
    }
    const name = decoded.name
    const updatedLog = updateLog(JSON.parse(log), -decreaseTime, userExternal, name, internalNote, justification)
    const response = await patchProjectForShip(recordId, updatedLog, "rejected")
    if (!response.ok) {
        const errorData = await response.json()
        console.error("Failed to update project log:", {
            status: response.status,
            error: errorData,
            timestamp: new Date().toISOString()
        })
        return error(500, "Failed to update project log")
    }
    return new Response(JSON.stringify({ message: "Log updated successfully", newLog: updatedLog }), { status: 200 })
}