import { generateSessionToken, createSession, setSessionTokenCookie } from "../../../../session";
import { google } from "../../../../../lib/google";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";
import { prisma } from "@repo/db/prisma";
import type { OAuth2Tokens } from "arctic";

interface GoogleClaims {
    // Required standard fields
    iss: string;              // Issuer
    azp: string;              // Authorized party
    aud: string;              // Audience
    sub: string;              // Subject identifier
    iat: number;              // Issued at time
    exp: number;              // Expiration time
    
    // Google specific fields
    email?: string;           // User's email address
    email_verified?: boolean; // Whether the email is verified
    at_hash?: string;         // Access token hash
    name?: string;            // User's full name
    picture?: string;         // URL to profile picture
    given_name?: string;      // First name
    family_name?: string;     // Last name
    
    // Allow for additional fields
    [key: string]: string | number | boolean | undefined;
  }

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const cookieStore = await cookies();
	const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
	const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const claims = decodeIdToken(tokens.idToken()) as GoogleClaims;
    
	const googleUserId = claims.sub;
	const username = claims.name;
    const email = claims.email
    const img = claims.picture

	// TODO: Replace this with your own DB query.
	const existingUser = await prisma.user.findUnique({
        where:{
            googleId : googleUserId
        }
    })

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		await setSessionTokenCookie(sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	}

	// TODO: Replace this with your own DB query.
	const user = await prisma.user.create({
        data:{
            googleId : googleUserId,
            name : username as string,
            email : email as string,
            image : img
        }
    })

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	await setSessionTokenCookie(sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	});
}