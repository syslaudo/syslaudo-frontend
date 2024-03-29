import styled from 'styled-components';

export const StyledDesktopNavbar = styled.header`
  height: 5rem;
  border-bottom: 1px solid var(--hover);

  > div {
    max-width: 1120px;
    height: 5rem;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    align-items: center;

    svg {
      height: 3rem;
    }

    nav {
      margin-left: 5rem;
      height: 5rem;
    }

    button {
      margin-left: auto;
      background: transparent;
      border: none;
      font-size: 2rem;
      color: var(--primary);

      display: none;
      align-items: center;
      justify-content: center;
    }

    > ul:last-of-type {
      margin-left: auto;
    }

    @media screen and (max-width: 950px) {
      > ul {
        display: none;
      }

      button {
        display: inline-block;
      }
    }
  }

  .navlinks {
    display: flex;

    > li {
      display: inline-block;
      position: relative;
      padding: 0 0.5rem;
      height: 5rem;
      line-height: 5rem;
      color: var(--text);
      transition: 0.2s;
      margin-left: 1.5rem;

      &:hover > span,
      &:hover > a {
        color: var(--primary);
        font-weight: bold;
      }

      &:hover > ul {
        display: block;
        z-index: 999999;
      }

      > ul {
        display: none;
        position: absolute;
        top: calc(5rem - 1px);
        background-color: var(--background);
        border: 1px solid var(--hover);
        padding: 0.3rem;

        > a {
          position: relative;
          display: block;
          line-height: 3rem;
          text-align: center;
          padding: 0 1rem;
          transition: 0.2ms;
          width: 10rem;

          &:hover {
            background: var(--primary);
            color: var(--white);
          }
        }
      }
    }

    @media screen and (max-width: 950px) {
      display: none;
    }
  }

  .profile {
    display: flex;

    > li {
      display: inline-block;
      position: relative;
      padding: 0 0.5rem;
      height: 5rem;
      line-height: 5rem;
      color: var(--text);
      transition: 0.2s;

      &:hover > div > span,
      &:hover > div > a {
        color: var(--primary);
        font-weight: bold;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          line-height: 2rem;
        }

        .fa-user-circle {
          color: var(--primary);
          font-size: 2rem;
          line-height: 5rem;
        }
      }

      &:hover > ul {
        display: block;
        z-index: 999999;
      }

      &:hover > ul.logoutButton {
        display: block;
        z-index: 999999;
      }

      > ul {
        display: none;
        position: absolute;
        top: calc(5rem - 1px);
        background-color: var(--background);
        border: 1px solid var(--hover);
        padding: 0.3rem;
        left: -2rem;

        > a {
          position: relative;
          display: block;
          line-height: 3rem;
          text-align: center;
          padding: 0 1rem;
          transition: 0.2ms;
          width: 11rem;

          &:hover {
            background: var(--primary);
            color: var(--white);
          }
        }
      }
    }

    @media screen and (max-width: 950px) {
      display: none;
    }
  }

  @media print {
    display: none;
  }
`;
