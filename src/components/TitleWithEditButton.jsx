import PT from "prop-types";
import styled from "styled-components";
import editIcon from "../assets/icons/edit.svg";

const TitleWithEditButtonPropTypes = {
  title: PT.string.isRequired,
  showEditButton: PT.bool,
  onEdit: PT.func
};

const TitleWithEditButtonDefaultProps = {
  showEditButton: false
};

const StyledTitleWithEditButton = styled.div`
  display: grid;
  grid-template-columns: max-content min-content;
  align-items: center;

  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
  color: var(--color-text-default);
`;

const StyledEditButton = styled.button`
  display: grid;
  margin-left: 10px;
`;

const StyledEditIcon = styled.img`
  width: 18px;
  height: 19px;
`;

const TitleWithEditButton = (props) => {
  const { title, showEditButton, onEdit } = props;

  const handleEditButtonClick = () => onEdit && onEdit();

  return (
    <StyledTitleWithEditButton>

      { title }

      {showEditButton && (
        <StyledEditButton type="button" onClick={handleEditButtonClick}>
          <StyledEditIcon src={editIcon} />
        </StyledEditButton>
      )}

    </StyledTitleWithEditButton>
  );
};

TitleWithEditButton.propTypes = TitleWithEditButtonPropTypes;
TitleWithEditButton.defaultProps = TitleWithEditButtonDefaultProps;

export default TitleWithEditButton;
