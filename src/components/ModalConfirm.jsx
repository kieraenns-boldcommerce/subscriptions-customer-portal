import PT from "prop-types";
import { Button } from "@boldcommerce/stacks-ui";
import Modal from "../components/Modal";
import styled from "styled-components";


const ModalConfirmPropTypes = {
  title: PT.string.isRequired,
  description: PT.string,
  textButtonCancel: PT.string,
  textButtonConfirm: PT.string,
  isVisible: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  onConfirm: PT.func.isRequired,
  onCancel: PT.func.isRequired
};

const ModalConfirmDefaultProps = {
  textButtonCancel: "Cancel",
  textButtonConfirm: "Confirm"
};


const StyledModalConfirm = styled.div`
  display: grid;
  row-gap: 12px;
`;

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const StyledDescription = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const StyledButtons = styled.div`
  margin-left: auto;
`;

const ModalConfirm = (props) => {
  const {
    title,
    description,
    textButtonCancel,
    textButtonConfirm,
    isVisible,
    onClose,
    onConfirm,
    onCancel
  } = props;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <StyledModalConfirm>
        <StyledTitle>
          { title }
        </StyledTitle>

        {description && (
          <StyledDescription>
            { description }
          </StyledDescription>
        )}

        <StyledButtons>
          <Button className="button" onClick={onCancel}>
            { textButtonCancel }
          </Button>
          <Button className="button" primary onClick={onConfirm}>
            { textButtonConfirm }
          </Button>
        </StyledButtons>
      </StyledModalConfirm>
    </Modal>
  );
};

ModalConfirm.propTypes = ModalConfirmPropTypes;
ModalConfirm.defaultProps = ModalConfirmDefaultProps;

export default ModalConfirm;
