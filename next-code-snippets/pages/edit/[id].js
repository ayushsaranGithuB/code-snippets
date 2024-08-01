// Edit Snippet Page
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [snippet, setSnippet] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/single/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSnippet(data);
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
      alert("Snippet updated successfully");
      // console.log(data);
      router.push("/");
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <>
      <div className="input-form">
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
    </>
  );
}
