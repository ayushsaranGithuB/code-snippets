import "@/styles/globals.css";
import "@/styles/atom-one-dark.css";
import "@/styles/forms.css";
import { Head } from "next/document";

export default function App({ Component, pageProps }) {
  <Head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code Snippets</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  </Head>;
  return <Component {...pageProps} />;
}
