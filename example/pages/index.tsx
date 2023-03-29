import { GetStaticProps } from "next";
import styled from "styled-components";
import { TestDom, StyledComponent } from "canvas-pixel-react";

const StyledBox = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home({ data }: { data: any }) {
  const { name } = data;
  return (
    <StyledBox>
      <Title>My page{name}</Title>
      <TestDom />
      <StyledComponent>这里</StyledComponent>
    </StyledBox>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: {
        name: "123",
      },
    },
  };
};
