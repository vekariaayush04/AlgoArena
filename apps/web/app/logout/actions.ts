"use server";
import { getCurrentSession, invalidateSession, deleteSessionTokenCookie } from "@/app/session";
import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

export async function logout(): Promise<void> {
	
	const { session } = await getCurrentSession();
	if (!session) {
		throw new Error("Unauthorized");
	}

	await invalidateSession(session.id);
	await deleteSessionTokenCookie();
	redirect("/");
}