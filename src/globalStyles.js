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

    font-size: 14px;
    line-height: 20px;
  }

  .button-AddressForm {
    padding-left: 24px;
    padding-right: 24px;
  }

  .stx-field {
    display: grid;
    position: static;
    margin: 0;

    .stx-field__label {
      margin-bottom: 4px;
      font-size: 13px;
    }
  }

  .stx-input__input-element {
    line-height: 20px;
  }

  .stx-field--with-select {
    display: grid;
    align-content: center;
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
    --color-text-default: rgba(0, 0, 0, 0.9);
    --color-text-link: #0a75c2;
  }
`;


export const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'SF Pro Display';
    src: local('SF Pro Display Bold'), local('SFProDisplay-Bold'),
        url('./assets/fonts/SFProDisplay-Bold.woff2') format('woff2'),
        url('./assets/fonts/SFProDisplay-Bold.woff') format('woff'),
        url('./assets/fonts/SFProDisplay-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Pro Display';
    src: local('SF Pro Display Semibold'), local('SFProDisplay-Semibold'),
        url('./assets/fonts/SFProDisplay-Semibold.woff2') format('woff2'),
        url('./assets/fonts/SFProDisplay-Semibold.woff') format('woff'),
        url('./assets/fonts/SFProDisplay-Semibold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Pro Display';
    src: local('SF Pro Display Regular'), local('SFProDisplay-Regular'),
        url('./assets/fonts/SFProDisplay-Regular.woff2') format('woff2'),
        url('./assets/fonts/SFProDisplay-Regular.woff') format('woff'),
        url('./assets/fonts/SFProDisplay-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: "SF Pro Display", sans-serif;
  }
`;
