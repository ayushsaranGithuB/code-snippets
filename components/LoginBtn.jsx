import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        console.log(session)
        return (
            <>

                <button className="button" onClick={() => signOut()}>
                    <img src={session.user.image} alt="avatar" title={'Signed in as: ' + session.user.name} className="avatar" height={20} />
                    Sign out
                </button>
            </>
        )
    }
    return (
        <>
            <button className="button" onClick={() => signIn()}>Sign in</button>
        </>
    )
} 