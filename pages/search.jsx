import ListSnippets from "@/components/ListSnippets";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

export default function SearchPage() {
    const router = useRouter();

    const [Loading, setLoading] = useState(true);
    const keyword = router.query.keyword;
    const [snippets, setSnippets] = useState(null);




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
            setLoading(false);
        }
    }, [keyword]);

    if (!keyword) {
        return (
            <>
                <Head>
                    <title>Code Snippets - Home</title>
                </Head>
                <p>
                    Please enter a keyword to search for snippets
                </p>
            </>
        );
    }


    if (Loading) {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>Code Snippets - Home</title>
            </Head>
            <SearchBox keyword={keyword} />

            <ListSnippets snippets={snippets} />

        </>
    );
}

