import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        console.log(session)
        return (
            <>
                <img src={session.user.image} alt="" className="avatar" height={20} />
                Signed in as {session.user.name} <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
} 