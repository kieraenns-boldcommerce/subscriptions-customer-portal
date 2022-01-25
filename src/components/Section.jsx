import PT from "prop-types";
import styled from "styled-components";
import TitleWithEditButton from "./TitleWithEditButton";

const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

const SectionPropTypes = {
  title: PT.string,
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};

const StyledSection = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding-top: 24px;

  @media (min-width: 576px) {
    padding-top: 32px;
  }
`;

const StyledTitle = styled.div`
  margin-bottom: 32px;

  @media (min-width: 576px) {
    margin-bottom: 28px;
  }
`;

const Section = (props) => {
  const { title, children } = props;

  return (
    <StyledSection>

      {title && (
        <StyledTitle>
          <TitleWithEditButton title={title} />
        </StyledTitle>
      )}

      { children }

    </StyledSection>
  );
};

Section.propTypes = SectionPropTypes;

export default Section;
