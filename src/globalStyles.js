import { createGlobalStyle } from "styled-components";

export const Resets = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  .stx-select,
  .stx-button,
  .button,
  .stx-field--with-select .stx-select,
  .stx-field--with-input .stx-input {
    margin: 0;

    text-transform: none;
  }

  button {
    border: none;
    border-radius: 0;
    padding: 0;

    background-color: transparent;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  .stx-field {
    margin-bottom: 0;
  }

  .stx-select__icon {
    pointer-events: none;
  }

  .stx-price__amount {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-align: left;
    color: inherit;
  }

  @media (min-width: 375px) {
    .button-ModalConfirm {
      width: max-content;

      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }

  @media (min-width: 576px) {
    .subscription-select-TopSection {
      max-width: 326px;
    }
  }
`;

export const Vars = createGlobalStyle`
  :root {
    --color-text-default: rgba(0, 0, 0, 0.8);
    --color-text-link: #0a75c2;
  }
`;

export const Fonts = createGlobalStyle`
  @font-face {
    font-family: "SF Pro Display";
    font-weight: 400;
    font-style: normal;
    font-display: swap;

    src:
      url("./assets/fonts/SFProDisplay-Regular.woff2") format("woff2"),
      url("./assets/fonts/SFProDisplay-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "SF Pro Display";
    font-weight: 700;
    font-style: normal;
    font-display: swap;

    src:
      url("./assets/fonts/SFProDisplay-Bold.woff2") format("woff2"),
      url("./assets/fonts/SFProDisplay-Bold.woff") format("woff");
  }

  body {
    font-family: "SF Pro Display", sans-serif;
  }
`;
