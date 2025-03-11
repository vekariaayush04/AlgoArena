import LandingPage from "@/components/LandingPage/LandingPage"
import { getCurrentSession } from "./session"
import Home from "@/components/HomePage/Home"
import { redirect } from "next/navigation"

export default async function Page() {
	const {session , user} = await getCurrentSession()

	if(session){
		redirect("/problems")
	}

	return(
		<LandingPage/>
	)
}