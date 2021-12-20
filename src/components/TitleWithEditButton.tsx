import { VFC } from "react";
import styled from "styled-components";
import Icon from "@/components/Icon";

export interface ITitleWithEditButton {
  title: string
  showEditButton?: boolean
  onEdit?: () => void
}

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

const TitleWithEditButton: VFC<ITitleWithEditButton> = (props) => {
  const { title, showEditButton = false, onEdit } = props;

  const handleEditButtonClick = () => onEdit && onEdit();

  return (
    <StyledTitleWithEditButton>

      { title }

      {showEditButton && (
        <StyledEditButton type="button" onClick={handleEditButtonClick}>
          <Icon name="edit-20" color="var(--color-text-link)" />
        </StyledEditButton>
      )}

    </StyledTitleWithEditButton>
  );
};

export default TitleWithEditButton;
