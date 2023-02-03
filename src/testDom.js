import { memo } from "react";
import styled from "styled-components";

const StyledComponent = styled.div`
  color: red;
`;

const TestDom = memo(() => {
  return <div>122345</div>;
});

export { TestDom, StyledComponent };
