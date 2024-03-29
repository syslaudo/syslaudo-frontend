import styled from 'styled-components';

export const StyledMobileNavbar = styled.nav<{
  displayMobile: boolean;
}>`
  width: 100vw;
  display: ${(props) => (props.displayMobile ? 'flex' : 'none')};
  flex-direction: column;
  font-size: 1.1rem;

  .navlinks,
  .profile {
    > li {
      text-transform: uppercase;

      .mob-hidden {
        display: none;
      }

      span {
        display: flex;
        height: 3rem;
        line-height: 3rem;
        justify-content: center;
        border-bottom: 1px solid var(--hover);
        font-weight: bold;
      }

      > a {
        display: flex;
        height: 3rem;
        line-height: 3rem;
        justify-content: center;
        border-bottom: 1px solid var(--hover);
        font-weight: bold;

        &:hover {
          background: var(--hover);
        }
      }

      > ul > a {
        display: flex;
        height: 3rem;
        line-height: 3rem;
        justify-content: center;
        border-bottom: 1px solid var(--hover);

        &:hover {
          background: var(--hover);
        }
      }
    }
  }
  
  @media screen and (min-width: 951px) {
    display: none;
  }

  @media print {
    display: none;
  }
`;
