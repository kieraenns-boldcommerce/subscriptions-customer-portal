import { createGlobalStyle } from "styled-components";

export const Resets = createGlobalStyle`
  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  button {
    border: none;
    border-radius: 0;
    padding: 0;

    background-color: transparent;
    cursor: pointer;
  }
`;

export const Vars = createGlobalStyle`
  :root {
    --color-text-default: rgba(0, 0, 0, 0.9);
    --color-text-link: #0a75c2;
  }
`;
