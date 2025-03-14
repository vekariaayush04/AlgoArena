import { Google } from "arctic";

export const google = new Google(
	process.env.AUTH_GOOGLE_ID!,
	process.env.AUTH_GOOGLE_SECRET!,
	`${process.env.BASE_URL}/api/login/google/callback`
);