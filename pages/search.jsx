import ListSnippets from "@/components/ListSnippets";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import { useRouter } from "next/router";

export default function SearchPage() {
    const router = useRouter();

    const keyword = router.query.keyword;


    const [snippets, setSnippets] = useState([]);

    useEffect(() => {
        if (keyword) {
            console.log("keyword is", keyword);
            fetch("/api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ keyword: keyword }),
            })
                .then((res) => res.json())
                .then((data) => setSnippets(data));
        }
    }, [keyword]);

    return (
        <>
            <Head>
                <title>Code Snippets - Home</title>
            </Head>
            <SearchBox keyword={keyword} />
            {
                snippets.length === 0 ?
                    (<p>No snippets found</p>) :
                    (
                        <ListSnippets snippets={snippets} />
                    )

            }
        </>
    );
}

