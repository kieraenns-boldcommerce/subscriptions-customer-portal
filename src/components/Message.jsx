import PT from "prop-types";
import { Button } from "@boldcommerce/stacks-ui";
import styled,  { css } from "styled-components";

const MessagePropTypes = {
  text: PT.string.isRequired,
  type: PT.oneOf(["alert", "warning", "info", "success", "default"]),
  buttonText: PT.string,
  onButtonClick: PT.func
};

const MessageDefaultProps = {
  type: "default"
};

const StyledMessage = styled.div`
  position: relative;

  display: grid;
  row-gap: 4px;

  padding: 12px 11px 12px 13px;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-default);

  border-left: 5px solid;

  ${({ type }) => {
    switch (type) {
    case "alert":
      return css`
        background-color: #fff3f4;
        border-color: #fc2036;
      `;
    case "warning":
      return css`
        background-color: #fefdf4;
        border-color: #f9e53a;
      `;
    case "info":
      return css`
        background-color: #f2f6ff;
        border-color: #1964fb;
      `;
    case "success":
      return css`
        background-color: #f7fef4;
        border-color: #6ff03b;
      `;
    default:
      return css`
        background-color: #f8f8f8;
        border-color: #6b6b6b;
      `;
    }
  }}

  .confirm-button {
    margin: 0;
    padding: 8px 30px;

    text-transform: none;
    font-size: 14px;
    line-height: 20px;
  }

  @media (min-width: 576px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    column-gap: 16px;
  }
`;


const Message = (props) => {
  const { type, text, buttonText, onButtonClick } = props;

  const showButton = Boolean(buttonText);

  return (
    <StyledMessage type={type}>
      { text }

      {showButton && (
        <Button
          size="large"
          className="confirm-button"
          onClick={onButtonClick}
        >
          { buttonText }
        </Button>
      )}
    </StyledMessage>
  );
};

Message.propTypes = MessagePropTypes;
Message.defaultProps = MessageDefaultProps;

export default Message;
