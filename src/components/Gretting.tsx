import { styled } from "@stitches/react";
import { Divider } from "antd";
import { Cormorant_Garamond } from "next/font/google";
import type { Data } from "@/types";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["500", "700"],
  subsets: ["latin", "latin-ext"],
  style: "normal",
});

const Wrapper = styled("div", {
  backgroundColor: "#f6efe4",
  width: "100%",
  fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
});

const Title = styled("p", {
  fontSize: "3.2vh",
  fontWeight: "bold",
  opacity: 0.85,
  marginBottom: 0,
});

const Content = styled("div", {
  fontSize: "2.25vh",
  lineHeight: 1.75,
  opacity: 0.75,
  marginBottom: 16,
  width: "100%",
  textAlign: "center",
});

const FamiliesContainer = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  marginTop: 32,
  marginBottom: 16,
  paddingBottom: 16,
});

const FamilySection = styled("div", {
  flex: 1,
  textAlign: "center",
  opacity: 0.85,
});

const FamilyName = styled("p", {
  fontSize: "2.7vh",
  fontWeight: "bold",
  opacity: 0.85,
  marginBottom: 8,
  margin: 0,
  fontFamily: `${cormorantGaramond.style.fontFamily}, 'Times New Roman', serif`,
  letterSpacing: "0.03em",
});

const FamilyParents = styled("p", {
  fontSize: "2.3vh",
  opacity: 0.75,
  marginBottom: 0,
  margin: 0,
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
      <FamiliesContainer>
        <FamilySection>
          <FamilyName>{data?.families?.left?.familyName}</FamilyName>
          <FamilyParents>{data?.families?.left?.parents}</FamilyParents>
        </FamilySection>
        <FamilySection>
          <FamilyName>{data?.families?.right?.familyName}</FamilyName>
          <FamilyParents>{data?.families?.right?.parents}</FamilyParents>
        </FamilySection>
      </FamiliesContainer>
    </Wrapper>
  );
}
