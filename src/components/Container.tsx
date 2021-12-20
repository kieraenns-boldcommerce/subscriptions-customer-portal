import { VFC } from "react";
import styled from "styled-components";

type Child = boolean | number | string | JSX.Element

export interface IContainer {
  children: Child | Child[]
}

const StyledContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  min-width: 320px;
  max-width: 1060px;
  padding-right: 16px;
  padding-left: 16px;
`;

const Container: VFC<IContainer> = (props) => {
  const { children } = props;

  return (
    <StyledContainer>
      { children }
    </StyledContainer>
  );
};

export default Container;
