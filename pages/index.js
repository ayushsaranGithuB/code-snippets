import ListSnippets from "@/components/ListSnippets";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import Loader from "@/components/Loader";
import FetchAllTags from "@/components/AllTags";

export default function Home() {
  const [snippets, setSnippets] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data));

    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Code Snippets - Home</title>
      </Head>
      <SearchBox />
      <FetchAllTags />
      {snippets.length === 0 ? (
        <Loader />
      ) : (
        <ListSnippets snippets={snippets} />
      )}
    </>
  );
}
