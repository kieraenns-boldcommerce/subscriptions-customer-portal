import { useContext } from "react";
import PT from "prop-types";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";
import editIcon from "../assets/icons/edit.svg";

const TitleWithEditButtonPropTypes = {
  title: PT.string.isRequired,
  showEditButton: PT.bool,
  altTextButton: PT.string,
  onEdit: PT.func
};

const TitleWithEditButtonDefaultProps = {
  showEditButton: false
};

const StyledTitleWithEditButton = styled.div`
  display: grid;
  grid-template-columns: max-content min-content;
  align-items: center;
  column-gap: 10px;

  font-size: 13px;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;
  color: var(--color-text-default);
`;

const StyledEditButtonWrapper = styled.div`
  position: relative;
`;

const StyledEditButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;

  display: grid;

  transform: translateY(-56%);

  &:disabled {
    opacity: 0.4;
  }
`;

const StyledEditIcon = styled.img`
  width: 18px;
  height: 19px;
`;

const TitleWithEditButton = (props) => {
  const { title, showEditButton, onEdit, altTextButton } = props;

  const { state } = useContext(AppContext);
  const { isAppLoading } = state;

  const handleEditButtonClick = () => onEdit && onEdit();

  return (
    <StyledTitleWithEditButton>

      { title }

      {showEditButton && (
        <StyledEditButtonWrapper>
          <StyledEditButton
            type="button"
            aria-label={altTextButton}
            disabled={isAppLoading}
            onClick={handleEditButtonClick}
          >
            <StyledEditIcon src={editIcon} />
          </StyledEditButton>
        </StyledEditButtonWrapper>
      )}

    </StyledTitleWithEditButton>
  );
};

TitleWithEditButton.propTypes = TitleWithEditButtonPropTypes;
TitleWithEditButton.defaultProps = TitleWithEditButtonDefaultProps;

export default TitleWithEditButton;
