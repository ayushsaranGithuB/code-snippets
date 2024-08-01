import ListSnippets from "@/components/ListSnippets";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("/api/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);

  return (
    <>
      <Head>
        <title>Code Snippets - Home</title>
      </Head>
      <SearchBox />
      {snippets.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ListSnippets snippets={snippets} />
      )}
    </>
  );
}
