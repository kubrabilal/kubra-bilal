import Head from "next/head";
import { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import dynamic from "next/dynamic";
import JsonData from "@/data.json";

const Envelope = dynamic(() => import("@/components/Envelope"), { ssr: false });

const Title = dynamic(() => import("@/components/Title"), { ssr: false });
const Gretting = dynamic(() => import("@/components/Gretting"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });
const Location = dynamic(() => import("@/components/Location"), { ssr: false });
const WeddingTimer = dynamic(() => import("@/components/Timer"), { ssr: false });
const BackgroundMusic = dynamic(() => import("@/components/BackgroundMusic"), {
  ssr: false,
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: "normal",
});

export default function Home() {
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [mediaEnabled, setMediaEnabled] = useState(false);

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

      <Envelope
        onInteract={() => setMediaEnabled(true)}
        onOpen={() => setInvitationVisible(true)}
      />

      <BackgroundMusic enabled={mediaEnabled} />

      <main
        className={cormorantGaramond.className}
        style={{
          opacity: invitationVisible ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
          pointerEvents: invitationVisible ? "auto" : "none",
          minHeight: "100vh",
        }}
      >
        <Title data={JsonData} playVideo={mediaEnabled} />
        <Gretting data={JsonData} />
        <Gallery />
        <Location />
        <WeddingTimer />
      </main>
    </>
  );
}