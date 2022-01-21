import { createGlobalStyle } from "styled-components";

export const Resets = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  .frequency-select,
  .stx-select,
  .stx-button,
  .button {
    margin: 0;
  }

  button {
    border: none;
    border-radius: 0;
    padding: 0;

    background-color: transparent;
    cursor: pointer;
  }

  .confirm-button-Message {
    padding: 8px 30px;

    text-transform: none;
    font-size: 14px;
    line-height: 20px;
  }

  .stx-field {
    position: static;
  }

  .stx-select__select-element {
    z-index: 1;
  }

  .stx-price__amount {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-align: left;
    color: inherit;
  }

  @media (min-width: 576px) {
    .subscription-select-TopSection {
      max-width: 326px;
    }
  }

  @media (min-width: 400px) {
    .button-ModalConfirm {
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
`;

export const Vars = createGlobalStyle`
  :root {
    --color-text-default: rgba(0, 0, 0, 0.9);
    --color-text-link: #0a75c2;
  }
`;
