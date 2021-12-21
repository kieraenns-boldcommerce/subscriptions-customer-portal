import PT from "prop-types";
import styled from "styled-components";

const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

export const FormLayoutPropTypes = {
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};

const StyledFormLayout = styled.div`
  display: grid;
  row-gap: 16px;

  @media (min-width: 1024px) {
    row-gap: 20px;
  }
`;

const FormLayout = (props) => {
  const { children } = props;

  return (
    <StyledFormLayout>
      { children }
    </StyledFormLayout>
  );
};

FormLayout.propTypes = FormLayoutPropTypes;

export default FormLayout;
