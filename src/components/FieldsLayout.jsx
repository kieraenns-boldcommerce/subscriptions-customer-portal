import PT from "prop-types";
import styled from "styled-components";

const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

export const FieldsLayoutPropTypes = {
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};

const StyledFieldsLayout = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(${({ fieldsAmount }) => fieldsAmount}, 1fr);
  }
`;

const FieldsLayout = (props) => {
  const { children } = props;

  const fieldsAmount = Array.isArray(children) ? children.length : 1;

  return (
    <StyledFieldsLayout fieldsAmount={fieldsAmount}>
      { children }
    </StyledFieldsLayout>
  );
};

FieldsLayout.propTypes = FieldsLayoutPropTypes;

export default FieldsLayout;
