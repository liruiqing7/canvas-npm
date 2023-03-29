import styled from "styled-components";
import PixelCanvas from "canvas-pixel-react";

const StyledPage = styled.div`
  padding: 50px;
`;

export default function Home({}: { data: any }) {
  return (
    <StyledPage>
      <PixelCanvas needConfirm={true} />
    </StyledPage>
  );
}
