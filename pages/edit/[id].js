// Edit Snippet Page
import Loader from "@/components/Loader";
import { useSession, signIn, signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPage() {
  const { data: session } = useSession();
  const [Loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;
  const [snippet, setSnippet] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/single/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSnippet(data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("create-form");
    const formData = new FormData(form);
    const data = {
      id: id,
      title: formData.get("title"),
      snippet: formData.get("snippet"),
      tags: formData.get("tags"),
    };

    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Snippet updated successfully. Redirecting...");
      setTimeout(() => {
        router.push("/single/" + id);
      }, 2000);
    } else {
      console.error("Error:", response.statusText);
    }
  };

  const handleDelete = async () => {
    // add a confirmation dialog
    const confirmDelete = confirm(
      "Are you sure you want to delete this snippet?"
    );
    if (!confirmDelete) {
      return;
    }

    const data = {
      id: id,
    };

    const response = await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Snippet deleted successfully. Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      console.error("Error:", response.statusText);
    }
  };

  if (!session) {
    return (
      <>
        <p>Please sign in to edit a snippet</p>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return (
      <>
        <p>Sorry, you do not have permission to edit snippets</p>
      </>
    );
  }

  if (Loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="input-form">
        <Toaster />
        <form
          name="create-form"
          id="create-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={snippet.title}
          />
          <label htmlFor="code">Code Snippet</label>
          <textarea
            name="snippet"
            id="code"
            required
            cols="40"
            rows="10"
            defaultValue={snippet.snippet}
          ></textarea>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            required
            defaultValue={snippet.tags}
          />
          <button type="submit">Update</button>
        </form>
      </div>
      <p className="delete">
        <button
          className="delete"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Snippet
        </button>
      </p>
    </>
  );
}
