import { validateSessionToken } from "../../session";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const token = request.cookies.get("session")?.value ?? null;
	if (token === null) {
		return  NextResponse.json(null);
	}

	const { session, user } = await validateSessionToken(token);
	if (session === null) {
		return  NextResponse.json(null);
	}

    return NextResponse.json(user)

}