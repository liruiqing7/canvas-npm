import React from "react";
import { TestDom, StyledComponent } from "canvas-npm";
import styled from "styled-components";

const Styled = styled.div`
  color: red;
`;

const App = React.memo(() => {
  return (
    <Styled>
      <TestDom />
      <StyledComponent>123</StyledComponent>
    </Styled>
  );
});

export default App;
