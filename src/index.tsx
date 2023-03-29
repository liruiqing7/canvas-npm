import React, { memo } from "react";
import styled from "styled-components";

const StyledComponent = styled.div`
  color: red;
  margin-top: 100px;
`;

const TestDom = memo(() => {
  const name: string = "liruiqing";

  return <div>{name}</div>;
});

export { TestDom, StyledComponent };
