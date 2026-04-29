import { useState, useEffect } from "react";
import { styled } from "@stitches/react";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  style: "normal",
});

const TimerWrapper = styled("div", {
  backgroundColor: "#f6efe4",
  width: "100%",
  marginTop: "-1px",
  padding: "57px 0",
  textAlign: "center",
});

const TimeUnit = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const UnitsRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  gap: "18px 16px",
});

const Number = styled("div", {
  fontSize: "4.7vh",
  fontWeight: "bold",
  color: "#d4af37", // Matching your map button gold
});

const Label = styled("div", {
  fontSize: "2vh",
  textTransform: "uppercase",
  letterSpacing: "1.2px",
  color: "#777",
  fontWeight: "700",
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif`,
});

export default function WeddingTimer() {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Setting target to July 26, 2026 at 19:00
    const targetDate = new Date("2026-07-26T19:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        // Calculations for months (approximate), days, hours, mins, secs
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ months, days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimerWrapper>
      <div
        style={{
          marginBottom: "31px",
          fontSize: "4.7vh",
          color: "#555",
          fontStyle: "italic",
          fontWeight: 700,
        }}
      >
        Düğünümüze kalan süre...
      </div>
      <UnitsRow>
        <TimeUnit>
          <Number>{timeLeft.months}</Number>
          <Label>Ay</Label>
        </TimeUnit>
        <TimeUnit>
          <Number>{timeLeft.days}</Number>
          <Label>Gün</Label>
        </TimeUnit>
        <TimeUnit>
          <Number>{timeLeft.hours}</Number>
          <Label>Saat</Label>
        </TimeUnit>
        <TimeUnit>
          <Number>{timeLeft.minutes}</Number>
          <Label>DAKİKA</Label>
        </TimeUnit>
        <TimeUnit>
          <Number>{timeLeft.seconds}</Number>
          <Label>SANİYE</Label>
        </TimeUnit>
      </UnitsRow>
    </TimerWrapper>
  );
}