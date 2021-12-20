import { VFC } from "react";
import styled from "styled-components";
import TitleWithEditButton from "@/components/TitleWithEditButton";

type Child = boolean | number | string | JSX.Element

export interface ISection {
  title: string
  children: Child | Child[]
}

const StyledSection = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding-top: 30px;
`;

const StyledTitle = styled.div`
  margin-bottom: 20px;
`;

const Section: VFC<ISection> = (props) => {
  const { title, children } = props;

  return (
    <StyledSection>

      <StyledTitle>
        <TitleWithEditButton title={title} />
      </StyledTitle>

      { children }

    </StyledSection>
  );
};

export default Section;
