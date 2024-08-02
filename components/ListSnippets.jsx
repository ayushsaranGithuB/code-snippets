import { useEffect } from "react";
import hljs from "highlight.js/lib/common";
import Loader from "./Loader";


const ListSnippets = ({ snippets }) => {

    if (!snippets) {
        return <Loader />;
    }

    if (snippets.length === 0) {
        return <p>No snippets found</p>;
    }


    const copy = (id) => {
        // Implement the copy functionality here
        const code = document.getElementById(id).querySelector("code").innerText;
        navigator.clipboard.writeText(code).then(
            () => {
                console.log("Code copied to clipboard");
            },
            () => {
                console.log("Failed to copy code to clipboard");
            }
        );
    };

    useEffect(() => {
        hljs.highlightAll();
        console.log("Highlighted all code blocks");
    }, [snippets]);

    return (
        <ul className="posts-list">
            {snippets.map((snippet) => (
                <li className="post" id={snippet.$id} key={snippet.$id}>
                    <h2 className="title">
                        <a href={"/single/" + snippet.$id}>
                            {snippet.title}
                        </a>
                        <a className="action" href={`/edit/${snippet.$id}`}>[Edit]</a>
                    </h2>

                    <pre>
                        <button onClick={() => copy(snippet.$id)}>copy</button>
                        <code>{snippet.snippet}</code>
                    </pre>

                    <div className="meta">
                        <p className="date">
                            {snippet.$updatedAt > snippet.$createdAt ? (
                                <>Updated: {new Date(snippet.$updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</>
                            ) : (
                                <>Created:  {new Date(snippet.$createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</>
                            )}
                        </p>
                        <p className="tags">
                            {snippet.tags.map((tag) => (
                                <a href={`/search?keyword=${tag}`} key={tag}>
                                    #{tag}
                                </a>
                            ))}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ListSnippets;