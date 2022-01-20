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
  isVisible: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 6;

  background-color: rgba(0, 0, 0, 0.6);

  visibility: ${({ isVisible }) => isVisible ? "visible" : "hidden"};
  overflow: auto;
`;

const StyledModalContent = styled.div`
  width: 100%;
  max-width: 606px;
  min-height: 100px;
  margin-top: 10px;

  margin: 16px auto;
  padding: 32px;

  border-radius: 8px;
  
  background-color: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.12);
`;

const Modal = (props) => {
  const { isVisible, onClose, children } = props;

  const onLowestLayerClick = (e) => e.target === e.currentTarget && onClose();

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();

    if (isVisible) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isVisible]);

  return (
    <StyledModal isVisible={isVisible} onClick={onLowestLayerClick}>
      <StyledModalContent>
        { children }
      </StyledModalContent>
    </StyledModal>
  );
};

Modal.propTypes = ModalPropTypes;

export default Modal;
