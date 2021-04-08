import styled from "styled-components";

export const StyledTabs = styled.div`
  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }

  .react-tabs__tab-list {
    margin-bottom: 2rem;
  }

  .react-tabs__tab {
    display: inline-block;
    margin-right: 1rem;
    background: var(--shadow);
    color: var(--text);
    border-radius: 2rem;
    position: relative;
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;
  }

  .react-tabs__tab--selected {
    background: var(--primary-shadow);
    color: var(--text);
    border-radius: 2rem;
  }
`;
