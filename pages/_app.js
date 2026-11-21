import "@fontsource-variable/familjen-grotesk";
import "@fontsource-variable/source-serif-4";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
