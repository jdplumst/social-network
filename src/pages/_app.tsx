import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { Router } from "next/router";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_URL,
  cache: new InMemoryCache()
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <p className="text-8xl font-bold">Loading...</p>
      ) : (
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      )}
    </>
  );
}
