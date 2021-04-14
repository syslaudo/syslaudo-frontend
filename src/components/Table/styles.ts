import styled from 'styled-components';

export const customStyles = {
  table: {
    style: {
      color: 'var(--text)',
      backgroundColor: 'var(--background)',
    },
  },
  tableWrapper: {
    style: {
      display: 'table',
    },
  },
  headRow: {
    style: {
      backgroundColor: 'var(--background)',
      minHeight: '2rem',
      borderBottomWidth: '1px',
      borderBottomColor: 'var(--hover)',
    },
  },
  rows: {
    style: {
      backgroundColor: 'var(--shadow)',
      fontSize: '1rem',
      color: 'var(--text)',
      minHeight: '2rem',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'var(--hover)',
      },
    },
    stripedStyle: {
      backgroundColor: 'var(--background)',
    },
  },
  headCells: {
    style: {
      color: 'var(--text)',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      fontWeight: 700,
      fontSize: '1rem',
    },
  },
  cells: {
    style: {
      color: 'var(--text)',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      fontSize: '1rem',
    },
  },
  pagination: {
    style: {
      fontSize: '1rem',
      minHeight: '2rem',
      backgroundColor: 'var(--background)',
    },
  },
  expanderRow: {
    style: {
      color: 'var(--text)',
      backgroundColor: 'var(--white)',
      paddingLeft: '4rem',
    },
  },
};

export const FilterInput = styled.div`
  display: flex;
  margin-bottom: 1rem;

  > div {
    margin-left: auto;
  }

  input {
    line-height: 2rem;
    padding: 0 0.5rem;
    color: var(--text);
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    border: 1px solid var(--border);
    background: var(--background);
    border-radius: 5px 0 0 5px;
    width: 15vh;

    &:focus {
      outline: none;
      border: 1px solid var(--primary);
      box-shadow: 0 0 0 2px var(--primary-shadow);
    }

    &:focus ~ button {
      outline: none;
      border: 1px solid var(--primary);
      box-shadow: 0 0 0 2px var(--primary-shadow);
    }

    &::placeholder {
      color: var(--text-fade);
    }
  }

  button {
    line-height: 2rem;
    padding: 0 0.5rem;
    color: var(--white);
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    border: 1px solid var(--border);
    border-left: none;
    background: var(--primary);
    border-radius: 0 5px 5px 0;
    transition: 0.2s;

    &:hover {
      background: var(--primary-hover);
    }
  }

  label {
    line-height: 2rem;
    margin-right: 1rem;
  }

  select {
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    padding: 0rem 2rem 0rem 0.5rem;
    text-align: center;
    line-height: 2rem;
    color: var(--text);
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    border: 1px solid var(--border);
    background: var(--background);
    border-radius: 5px;
    margin-right: 1rem;

    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%),
      radial-gradient(transparent 100%, transparent 72%);
    background-position: calc(100% - 20px) calc(1rem),
      calc(100% - 15px) calc(1rem), calc(100% - 0.5rem) 0.5rem;
    background-size: 5px 5px, 5px 5px, 1.5rem 1.5rem;
    background-repeat: no-repeat;

    &:focus {
      outline: none;
      border: 1px solid var(--primary);
      box-shadow: 0 0 0 2px var(--primary-shadow);
    }
  }
`;

export const ActionButton = styled.button`
  padding: 0;
  background: transparent;
  border: none;

  &:hover {
    color: var(--primary);
  }
`;
