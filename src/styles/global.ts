import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --white: #ffffff;
  --background: #f2f3f5;
  --text: #444444;
  --text-fade: #888888;
  --primary: #0190ab;
  --primary-shadow: rgba(1, 143, 171, 0.5);
  --primary-hover: #017b94;
  --background-dark: #191919;
  --text-dark: #bababa;
  --shadow: rgba(0, 0, 0, 0.05);
  --hover: #e0e0e0;
  --border: #d5d6d8;
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

body {
  background: var(--background);
  color: var(--text);
}

body,
input,
textarea,
select,
button {
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  fill: var(--primary);
}

.svg {
  fill: var(--primary);
}

h1{
  margin-bottom: 2rem;
}

table, caption, tbody, tfoot, thead, tr, th, td {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

.react-modal-overlay {
    background: rgba(0, 0, 0, 0.8);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 900px;
    max-width: 80%;
    max-height: 90%;
    overflow-y: auto;
    background: var(--background);
    color: var(--text);
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;

    h1 {
      text-transform: uppercase;
    }

    &:focus {
      outline: none;
    }

    @media (max-width: 600px) {
      max-width: 95%;
      padding: 2rem;
    }
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;
    color: var(--text);

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
