import Footer from "@/components/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="container">
          <Main />
          <NextScript />
          <Footer />
        </div>
      </body>
    </Html>
  );
}
