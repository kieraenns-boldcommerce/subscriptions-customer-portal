import { useEffect } from "react";
import PT from "prop-types";
import styled from "styled-components";

const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

const ModalPropTypes = {
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired,
  onClose: PT.func,
  isVisible: PT.bool
};

const ModalDefaultProps = {
  isVisible: false
};


const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7;

  display: ${({ isVisible }) => !isVisible && "none"};

  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);

  overflow: auto;

  &::after {
    content: "";
    
    display: inline-block;
    height: 100%;

    vertical-align: middle;
  }
`;

const StyledModalContainer = styled.div`
  width: 100%;
  max-width: 638px;
  display: inline-block;

  text-align: left;
  vertical-align: middle;
`;

const StyledModalContent = styled.div`
  margin: 16px;
  padding: 32px;

  border-radius: 8px;
  
  background-color: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.12);
`;

const Modal = (props) => {
  const { isVisible, onClose, children } = props;

  const onOverlayClick = (event) => event.target === event.currentTarget && onClose();

  useEffect(() => {
    const handleKeydown = (event) => event.key === "Escape" && onClose();

    if (isVisible) document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isVisible]);

  return (
    <StyledModal isVisible={isVisible} onClick={onOverlayClick}>
      <StyledModalContainer>
        <StyledModalContent>
          { children }
        </StyledModalContent>
      </StyledModalContainer>
    </StyledModal>
  );
};

Modal.propTypes = ModalPropTypes;
Modal.defaultProps = ModalDefaultProps;

export default Modal;
