import { useRef, useEffect, useState } from "react";
import PT from "prop-types";
import styled, { css } from "styled-components";
import ellipsis from "../assets/icons/ellipsis.svg";


const MenuItemPropTypes = {
  name: PT.string.isRequired,
  dismiss: PT.bool.isRequired
};

const MenuPropTypes = {
  data: PT.arrayOf(PT.shape(MenuItemPropTypes)).isRequired,
  onClickItem: PT.func.isRequired
};


const StyledMenu = styled.div`
  position: relative;
`;

const StyledMenuList = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  right: -15px;

  width: 100%;
  max-width: 281px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);

  z-index: 6;
`;

const StyledMenuItem = styled.button`
  width: 100%;
  padding: 20px 23px;

  text-align: left;
  font-size: 14px;
  line-height: 24px;
  ${({ dismiss }) => dismiss && css`
    color: #d91626;
  `}

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
  const { data, onClickItem } = props;

  const [openMenu, setOpenMenu] = useState(false);

  const menuListRef = useRef(null);

  useEffect(() => {
    const onClose = (e) => !menuListRef?.current.contains(e.target) && openMenu && setOpenMenu(false);

    document.addEventListener("click", onClose);
    return () => document.removeEventListener("click", onClose);
  }, [openMenu]);

  return (
    <StyledMenu>
      <StyledMenuButton onClick={() => setOpenMenu((v) => !v)}>
        <StyledIcon src={ellipsis} />
      </StyledMenuButton>

      {openMenu && (
        <StyledMenuList ref={menuListRef}>
          {data.map((item, index) => {
            const { name, dismiss } = item;

            return (
              <StyledMenuItem
                key={index}
                onClick={() => onClickItem(item)}
                dismiss={dismiss}
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
