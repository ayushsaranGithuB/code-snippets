import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';

const CreatePage = () => {
    const router = useRouter();

    const { data: session } = useSession()
    if (!session) {
        return (
            <>
                <p className="centered">Please sign in to add a snippet</p>
            </>
        )
    }

    if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        return (
            <>
                <p>Sorry, you do not have permission to add a snippet</p>
            </>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById('create-form');
        const formData = new FormData(form);
        const data = {
            title: formData.get('title'),
            snippet: formData.get('snippet'),
            tags: formData.get('tags')
        };

        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            toast.success('Snippet added successfully. Redirecting...');
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } else {
            console.error('Error:', response.statusText);
        }


    }

    return (<>
        <div className="input-form">
            <Toaster />
            <form name="create-form" id="create-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" required />
                <label htmlFor="code">Code Snippet</label>
                <textarea name="snippet" id="code" required cols="40" rows="10"></textarea>
                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" id="tags" required />
                <button type="submit">Add Snippet</button>
            </form>
        </div>
    </>);
}

export default CreatePage;