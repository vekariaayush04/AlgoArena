import { JSX } from "react";
import { auth, signIn, signOut } from "../auth";

export default async function Home() {
  const session  = await auth()
  if (!session || !session.user) {
    return <SignIn />
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.user.email}</p>
      <SignOut />
    </div>
  )
}


export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  )
}
