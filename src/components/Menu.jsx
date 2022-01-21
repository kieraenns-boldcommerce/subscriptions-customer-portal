import { useRef, useEffect, useState } from "react";
import PT from "prop-types";
import styled, { css } from "styled-components";
import ellipsis from "../assets/icons/ellipsis.svg";


const MenuItemPropTypes = {
  type: PT.oneOf(["default", "alert"]),
  name: PT.string.isRequired,
  value: PT.string.isRequired
};

const MenuPropTypes = {
  items: PT.arrayOf(PT.shape(MenuItemPropTypes)).isRequired,
  onItemClick: PT.func
};


const StyledMenu = styled.div`
  position: relative;
  z-index: 2;
`;

const StyledMenuList = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  right: -15px;

  width: 100%;
  max-width: 280px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);

  &::after,
  &::before {
    content: "";

    position: absolute;
    top: 0;
    right: 15px;

    width: 30px;
    height: 30px;
    border-radius: 3px;

    background-color: #ffffff;

    transform: rotate(45deg) translateY(-50%);
  }

  &::after {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
    z-index: -1;
  }
`;

const StyledMenuItem = styled.button`
  width: 100%;
  padding: 20px 24px;

  text-align: left;
  font-size: 14px;
  line-height: 24px;
  ${({ type }) => {
    switch (type) {
    case "alert":
      return css`
        color: #d91626;
      `;
    default:
      return css`
        color: rgba(0, 0, 0, 0.8);
      `;
    }
  }}

  &:not(:last-child) {
    border-bottom: 1px solid rgba(108, 112, 114, 0.1);
  }
`;

const StyledMenuButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #808080;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.img`
  width: 14px;
  height: 14px;
`;


const Menu = (props) => {
  const { items, onItemClick } = props;

  const [showMenuList, setShowMenuList] = useState(false);

  const menuListRef = useRef(null);

  const onShowMenuListButtonClick = () => setShowMenuList((v) => !v);

  useEffect(() => {
    const onClose = (e) => !menuListRef?.current.contains(e.target) && showMenuList && setShowMenuList(false);

    document.addEventListener("click", onClose);
    return () => document.removeEventListener("click", onClose);
  }, [showMenuList]);

  return (
    <StyledMenu>
      <StyledMenuButton onClick={onShowMenuListButtonClick}>
        <StyledIcon src={ellipsis} />
      </StyledMenuButton>

      {showMenuList && (
        <StyledMenuList ref={menuListRef}>
          {items.map((item) => {
            const { type = "default", name, value } = item;

            const onMenuItemClick = () => onItemClick(item);

            return (
              <StyledMenuItem
                key={value}
                type={type}
                onClick={onMenuItemClick}
              >
                { name }
              </StyledMenuItem>
            );
          })}
        </StyledMenuList>
      )}
    </StyledMenu>
  );
};

Menu.propTypes = MenuPropTypes;

export default Menu;
