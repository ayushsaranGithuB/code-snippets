import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        console.log(session)
        return (
            <>
                <img src={session.user.image} alt="avatar" title={'Signed in as: ' + session.user.name} className="avatar" height={20} />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
} 