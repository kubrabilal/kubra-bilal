import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { Allura } from "next/font/google";
import dynamic from "next/dynamic";
import JsonData from "@/data.json";
import ScrollHint from "@/components/ScrollHint";
const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SCROLL_HINT_DELAY_MS = 2800;
const SCROLL_HINT_DISMISS_PX = 40;

const Envelope = dynamic(() => import("@/components/Envelope"), { ssr: false });

const Title = dynamic(() => import("@/components/Title"), { ssr: false });
const Gretting = dynamic(() => import("@/components/Gretting"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });
const Location = dynamic(() => import("@/components/Location"), { ssr: false });
const WeddingTimer = dynamic(() => import("@/components/Timer"), { ssr: false });
const BackgroundMusic = dynamic(() => import("@/components/BackgroundMusic"), {
  ssr: false,
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});

export default function Home() {
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [mediaEnabled, setMediaEnabled] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const invitationVisibleRef = useRef(false);
  const pendingScrollHintRef = useRef(false);
  const scrollHintDismissedRef = useRef(false);
  const hintTimerRef = useRef<number | null>(null);

  useEffect(() => {
    invitationVisibleRef.current = invitationVisible;
  }, [invitationVisible]);

  const onIntroStart = useCallback(() => {
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }
    hintTimerRef.current = window.setTimeout(() => {
      hintTimerRef.current = null;
      if (scrollHintDismissedRef.current) return;
      if (invitationVisibleRef.current) {
        setShowScrollHint(true);
      } else {
        pendingScrollHintRef.current = true;
      }
    }, SCROLL_HINT_DELAY_MS) as unknown as number;
  }, []);

  useEffect(() => {
    if (!invitationVisible) return;

    if (!scrollHintDismissedRef.current && pendingScrollHintRef.current) {
      pendingScrollHintRef.current = false;
      setShowScrollHint(true);
    }

    if (window.scrollY > SCROLL_HINT_DISMISS_PX) {
      scrollHintDismissedRef.current = true;
      pendingScrollHintRef.current = false;
      setShowScrollHint(false);
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    }

    const onScroll = () => {
      if (window.scrollY <= SCROLL_HINT_DISMISS_PX) return;
      scrollHintDismissedRef.current = true;
      pendingScrollHintRef.current = false;
      setShowScrollHint(false);
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [invitationVisible]);

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
        <link
          rel="preload"
          href={`${ASSET_BASE}/assets/giris.mp4`}
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href={`${ASSET_BASE}/assets/BackgroundVideo.mp4`}
          as="video"
          type="video/mp4"
        />
      </Head>

      <Envelope
        onInteract={() => setMediaEnabled(true)}
        onIntroStart={onIntroStart}
        onOpen={() => setInvitationVisible(true)}
        backgroundReady={backgroundReady}
      />

      <BackgroundMusic enabled={mediaEnabled} />

      <main
        className={allura.className}
        style={{
          display: invitationVisible ? "block" : "none",
          pointerEvents: invitationVisible ? "auto" : "none",
          minHeight: "100vh",
        }}
      >
        <Title
          data={JsonData}
          playVideo={mediaEnabled}
          onVideoReady={() => setBackgroundReady(true)}
        />
        <Gretting data={JsonData} />
        <WeddingTimer />
        <Location />
        <Gallery />
        {showScrollHint ? <ScrollHint /> : null}
      </main>
    </>
  );
}