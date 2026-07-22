import React from "react";
import Head from "next/head";
import appData from "@data/app.json";
import Script from 'next/script';
import '../styles/scss/style.scss';
import "../styles/globals.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          {/* seo begin */}
          <title>{appData.settings.siteName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="HandheldFriendly" content="true" />
          <meta name="author" content="bslthemes" />
          {/* seo end */}        
      </Head>
      <Component {...pageProps} />

      {/* Google Analytics – load after page becomes interactive */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-045ZRL47E2"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-045ZRL47E2');
          `,
        }}
      />
    </>
  );
}
 

export default MyApp;
