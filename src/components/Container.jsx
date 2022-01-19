import PT from "prop-types";
import styled from "styled-components";

const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

const ContainerPropTypes = {
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};

const StyledContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  min-width: 320px;
  max-width: 1060px;
  padding-right: 16px;
  padding-left: 16px;
`;

const Container = (props) => {
  const { children } = props;

  return (
    <StyledContainer>
      { children }
    </StyledContainer>
  );
};

Container.propTypes = ContainerPropTypes;

export default Container;
