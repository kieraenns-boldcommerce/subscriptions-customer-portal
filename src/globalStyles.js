import { createGlobalStyle } from "styled-components";

export const Resets = createGlobalStyle`
  @font-face {
    font-family: "SF Pro Display";
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src:
      url("./assets/fonts/SF-Pro-Display-Regular.woff2") format("woff2"),
      url("./assets/fonts/SF-Pro-Display-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "SF Pro Display";
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    src:
      url("./assets/fonts/SF-Pro-Display-Semibold.woff2") format("woff2"),
      url("./assets/fonts/SF-Pro-Display-Semibold.woff") format("woff");
  }

  @font-face {
    font-family: "SF Pro Display";
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src:
      url("./assets/fonts/SF-Pro-Display-Bold.woff2") format("woff2"),
      url("./assets/fonts/SF-Pro-Display-Bold.woff") format("woff");
  }

  body {
    font-family: "SF Pro Display", sans-serif;
  }

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
  .button,
  .frequency-select .stx-select {
    margin: 0;
  }

  *::before,
  *::after,
  .stx-select__icon {
    pointer-events: none;
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

  .button-AddressForm {
    padding-left: 24px;
    padding-right: 24px;
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
      width: max-content;

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
