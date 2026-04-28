import { styled } from "@stitches/react";
import type { Data } from "@/types";
import { useEffect, useRef } from "react";

const Layout = styled("div", {
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  margin: "0px auto",
  position: "relative",
});

const TitleWrapper = styled("div", {
  position: "absolute",
  width: "100%",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  textShadow: "-1px 0 #9e9e9e, 0 1px #9e9e9e, 1px 0 #9e9e9e, 0 -1px #9e9e9e",
});

const VideoBackground = styled("video", {
  backgroundColor: "#aeb8b3 !important",
  opacity: 0.9,
  objectFit: "cover",
  objectPosition: "center center",
  width: "100%",
  height: "100%",
  minHeight: 480,
});

const WeddingInvitation = styled("p", {
  fontSize: "1.5vh",
  opacity: 0.45,
  marginBottom: 16,
});

const Couple = styled("p", {
  fontSize: "6vh",
  fontWeight: "bold",
  opacity: 0.9,
  marginBottom: 16,
});

const Schedule = styled("p", {
  fontSize: "2.5vh",
  opacity: 0.65,
  marginBottom: 24,
});

type TitleProps = {
  data?: Data;
  playVideo?: boolean;
  onVideoReady?: () => void;
};

export default function Title({
  data,
  playVideo = true,
  onVideoReady,
}: TitleProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!playVideo) {
      el.pause();
      return;
    }

    try {
      el.currentTime = 0;
    } catch {
      // ignore
    }
    void el.play();
  }, [playVideo]);

  return (
    <Layout>
      <VideoBackground
        ref={videoRef}
        loop
        muted
        playsInline={true}
        preload="auto"
        onCanPlayThrough={onVideoReady}
      >
        <source src="./assets/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>
      <TitleWrapper>
        <Couple>{data?.couple}</Couple>
        <Schedule>
          {data?.date}
          <br />
          {data?.time}
          <br />
          {data?.location}
        </Schedule>
      </TitleWrapper>
    </Layout>
  );
}
