import { VFC } from "react";
import styled, { css } from "styled-components";

export interface IIcon {
  name: string;
  color?: string;
}

type Size = 0 | 14 | 20

interface IStyledIcon {
  size: Size;
  color: string;
}

const StyledIcon = styled.svg<IStyledIcon>`
  ${({ size, color }) => css`
    width: ${size}px;
    height: ${size}px;

    fill: ${color};
  `}
`;

const Icon: VFC<IIcon> = (props) => {
  const { name, color = "#000000" } = props;

  const xlinkHref = `#${name}`;

  let size: Size = 0;
  if (name.includes("14")) size = 14;
  if (name.includes("20")) size = 20;

  return (
    <StyledIcon size={size} color={color}>
      <use xlinkHref={xlinkHref} />
    </StyledIcon>
  );
};

export default Icon;
