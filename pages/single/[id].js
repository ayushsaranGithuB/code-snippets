import ListSnippets from "@/components/ListSnippets";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

export default function Single() {
  const router = useRouter();
  const { id } = router.query;
  const [snippet, setSnippet] = useState([]);

  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/single/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSnippet([data]);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Code Snippets - Home</title>
      </Head>
      <p className="centered">
        <a href="/">&laquo; Back to all Snippets</a>
      </p>

      <SearchBox />
      {snippet.length === 0 ? <Loader /> : <ListSnippets snippets={snippet} />}
    </>
  );
}
