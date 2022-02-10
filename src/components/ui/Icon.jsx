import styled, {css} from "styled-components";
import PT from "prop-types";

const StyledSvg = styled.svg`
  ${({width, height}) => css`
    height: ${height}px;
    width: ${width}px;
  `}
`;

const IconPropTypes = {
  name: PT.string.isRequired,
  height: PT.number,
  width: PT.number,
  className: PT.string
};

const IconDefaultProps = {
  height: 24,
  width: 24
};

const Icon = ({name, height, width, className}) => {
  return <StyledSvg width={width} height={height} className={className}>
    <use xlinkHref={`#${name}`}/>
  </StyledSvg>;
};

Icon.propTypes = IconPropTypes;
Icon.defaultProps = IconDefaultProps;

export default Icon;
