import Head from "next/head";
import React from "react";

function PageLayout({ children }) {
  return (
    <>
      <Head>
        <title>Share Buddy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}

export default PageLayout;
