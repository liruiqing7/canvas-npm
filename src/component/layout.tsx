import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

const StyledLayout = styled.div``;

export default React.memo(({ children }: Props) => {
  return <StyledLayout>{children}</StyledLayout>;
});
