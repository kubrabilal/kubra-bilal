import Head from "next/head";
import { useEffect, useState } from "react";
import { Noto_Sans_KR } from "next/font/google";
import dynamic from "next/dynamic";
import { styled } from "@stitches/react";
import JsonData from "@/data.json";
import Script from "next/script";

// 1. Import the Envelope component
const Envelope = dynamic(() => import("@/components/Envelope"), { ssr: false });

const Title = dynamic(() => import("@/components/Title"), { ssr: false });
const Gretting = dynamic(() => import("@/components/Gretting"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });
const Location = dynamic(() => import("@/components/Location"), { ssr: false });
const WeddingTimer = dynamic(() => import("@/components/Timer"), { ssr: false });

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: [],
  style: "normal",
});

export default function Home() {
  // 2. Add a 'state' to track if the envelope has been opened
  const [invitationVisible, setInvitationVisible] = useState(false);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta content="Kübra & Bilal 26.07.2026" name="Title" />
        <meta
          content="Kübra & Bilal Düğün Davetiyesi - 26 Temmuz 2026"
          name="Description"
        />
        <meta content="Kübra & Bilal Düğün Davetiyesi - 26 Temmuz 2026" name="Keyword" />
        <meta property="og:title" content="Kübra & Bilal 26.07.2026" />
        <meta
          property="og:description"
          content="Kübra & Bilal Düğün Davetiyesi - 26 Temmuz 2026"
        />
        <meta
          property="og:url"
          content="https://kubrabilal.github.io/kubra-bilal/"
        />
        <meta
          property="og:image"
          content="https://kubrabilal.github.io/kubra-bilal/assets/og-image.jpg"
        />
        <meta name="theme-color" content="#BCAAA4" />
        <title>Kübra & Bilal 26.07.2026</title>
      </Head>

      {/* 3. Show the Envelope overlay first */}
      <Envelope onOpen={() => setInvitationVisible(true)} />

      {/* 4. The main content now has a transition effect */}
      <main 
        className={`${notoSansKR.className}`}
        style={{ 
          opacity: invitationVisible ? 1 : 0, 
          transition: 'opacity 1.5s ease-in-out',
          visibility: invitationVisible ? 'visible' : 'hidden',
          overflow: 'hidden',
          minHeight: '100vh',
        }}
      >
        <Title data={JsonData} />
        <Gretting data={JsonData} />
        <Gallery />
        <Location />
        <WeddingTimer />
      </main>
    </>
  );
}