import { styled } from "@stitches/react";
import { Divider } from "antd";
import { Marcellus } from "next/font/google";
import type { Data } from "@/types";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  style: "normal",
});

const Wrapper = styled("div", {
  backgroundColor: "#f6efe4",
  width: "100%",
  paddingTop: 28,
  fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
});

const Title = styled("p", {
  fontSize: "3.6vh",
  fontWeight: "bold",
  opacity: 0.85,
  margin: 0,
  lineHeight: 1.1,
});

const Content = styled("div", {
  fontSize: "3.4vh",
  lineHeight: 1.75,
  opacity: 0.75,
  margin: "0 auto 14px auto",
  width: "100%",
  maxWidth: "min(92vw, 760px)",
  padding: "0 10px",
  overflowWrap: "break-word",
  textAlign: "center",
});

const ElegantLine = styled("div", {
  width: "min(320px, 72vw)",
  height: 1,
  margin: "16px auto 12px auto",
  background:
    "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.85), rgba(0,0,0,0))",
});

const FamiliesContainer = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  marginTop: 29,
  marginBottom: 0,
  paddingBottom: 29,
  flexWrap: "wrap",
  gap: "16px 12px",
});

const FamilySection = styled("div", {
  flex: 1,
  textAlign: "center",
  opacity: 0.85,
});

const FamilyName = styled("p", {
  fontSize: "2.4vh",
  fontWeight: "bold",
  opacity: 0.85,
  marginBottom: 8,
  margin: 0,
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif`,
  letterSpacing: "0.03em",
});

const FamilyParents = styled("p", {
  fontSize: "2.1vh",
  opacity: 0.75,
  marginBottom: 0,
  margin: 0,
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif`,
});

const FamilyPhone = styled("p", {
  fontSize: "1.8vh",
  opacity: 0.78,
  margin: "5px 0 0 0",
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif`,
  letterSpacing: "0.02em",
});

const EventDetails = styled("div", {
  fontSize: "2vh",
  lineHeight: 1.6,
  opacity: 0.85,
  paddingBottom: 11,
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "min(700px, 100%)",
  padding: "0 10px 12px 10px",
});

const EventRow = styled("div", {
  display: "grid",
  gridTemplateColumns: "220px 10px 1fr",
  columnGap: 0,
  alignItems: "baseline",
  width: "100%",
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif`,
  "@media (max-width: 480px)": {
    gridTemplateColumns: "150px 9px 1fr",
  },
});

const EventLabel = styled("span", {
  fontWeight: 700,
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif !important`,
  justifySelf: "end",
});

const EventColon = styled("span", {
  justifySelf: "center",
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif !important`,
});

const EventValue = styled("span", {
  fontFamily: `${marcellus.style.fontFamily}, 'Times New Roman', serif !important`,
  justifySelf: "start",
  textAlign: "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

type GrettingProps = {
  data?: Data;
};

export default function Gretting({ data }: GrettingProps) {
  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>Davet Mesajı</Title>
      </Divider>
      <Content>
        {data?.gretting?.split("\n")?.map((value, index) => {
          return (
            <div key={index}>
              {value}
              <br />
            </div>
          );
        })}
      </Content>
      <ElegantLine />
      <FamiliesContainer>
        <FamilySection>
          <FamilyName>{data?.families?.left?.familyName}</FamilyName>
          <FamilyParents>{data?.families?.left?.parents}</FamilyParents>
          <FamilyPhone>0537 602 91 79</FamilyPhone>
        </FamilySection>
        <FamilySection>
          <FamilyName>{data?.families?.right?.familyName}</FamilyName>
          <FamilyParents>{data?.families?.right?.parents}</FamilyParents>
          <FamilyPhone>0532 487 52 87</FamilyPhone>
        </FamilySection>
      </FamiliesContainer>
      <ElegantLine />
      <EventDetails>
        <EventRow>
          <EventLabel>Düğün</EventLabel>
          <EventColon>:</EventColon>
          <EventValue>26 Temmuz 2026, Pazar</EventValue>
        </EventRow>
        <EventRow>
          <EventLabel>Saat</EventLabel>
          <EventColon>:</EventColon>
          <EventValue>19:00</EventValue>
        </EventRow>
        <EventRow>
          <EventLabel>Yer</EventLabel>
          <EventColon>:</EventColon>
          <EventValue>Tektaş Düğün Salonu</EventValue>
        </EventRow>
        <EventRow>
          <EventLabel>Gelin Alma Saati</EventLabel>
          <EventColon>:</EventColon>
          <EventValue>17:30</EventValue>
        </EventRow>
      </EventDetails>
    </Wrapper>
  );
}
