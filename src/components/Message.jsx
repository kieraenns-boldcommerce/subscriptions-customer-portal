import PT from "prop-types";
import { Button } from "@boldcommerce/stacks-ui";
import styled,  { css } from "styled-components";

const MessagePropTypes = {
  messageText: PT.string.isRequired,
  type: PT.oneOf(["alert", "warning", "info", "success"]),
  buttonText: PT.string,
  onConfirm: PT.func
};

const MessageDefaultProps = {
  type: "default",
  buttonText: ""
};

const StyledMessage = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 12px 30px;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-default);

  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    width: 5px;
  }

  ${({ type }) => {
    switch (type) {
    case "alert":
      return css`
        background-color: #fff3f4;

        &::before {
          background-color: #fc2036;
        }
      `;
    case "warning":
      return css`
        background-color: #fefdf4;

        &::before {
          background-color: #f9e53a;
        }
      `;
    case "info":
      return css`
        background-color: #f2f6ff;

        &::before {
          background-color: #1964fb;
        }
      `;
    case "success":
      return css`
        background-color: #f7fef4;

        &::before {
          background-color: #6ff03b;
        }
      `;
    default:
      return css`
        background-color: #f8f8f8;

        &::before {
          background-color: #6b6b6b;
        }
      `;
    }
  }}

  .confirm-button {
    margin: 0;
    padding: 8px 30px;

    text-transform: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 576px) {
    display: grid;
    row-gap: 4px;
    grid-template-columns: 1fr;
  }
`;


const Message = (props) => {
  const { type, messageText, buttonText, onConfirm } = props;

  const isButton = Boolean(buttonText);

  return (
    <StyledMessage type={type}>
      { messageText }

      {isButton && (
        <Button className="confirm-button" onClick={onConfirm}>{ buttonText }</Button>
      )}
    </StyledMessage>
  );
};

Message.propTypes = MessagePropTypes;
Message.defaultProps = MessageDefaultProps;

export default Message;
