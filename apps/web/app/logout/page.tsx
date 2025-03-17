import { getCurrentSession, invalidateSession, deleteSessionTokenCookie } from "@/app/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
	return (
		<form action={logout}>
			<button>Sign out</button>
		</form>
	);
}

async function logout(): Promise<void> {
	"use server";
	const { session } = await getCurrentSession();
	if (!session) {
		throw new Error("Unauthorized");
	}

	await invalidateSession(session.id);
	await deleteSessionTokenCookie();
	redirect("/");
}