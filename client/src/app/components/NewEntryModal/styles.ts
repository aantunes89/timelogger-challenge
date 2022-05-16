import styled from "styled-components";

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 3rem;
    margin-top: 1.5rem;

    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;

    background-color: #e7e9ee;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"],
  button.cancel {
    width: 100%;
    height: 4rem;

    padding: 0 1.5rem;
    margin-top: 1.5rem;
    border-radius: 0.25rem;
    border: 0;

    background-color: var(--green);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;

    transition: filter 0.4s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  button.cancel {
    background-color: #d7d7d7;
  }

  .action-buttons__wrapper {
    display: flex;
    align-items: center;

    justify-content: space-between;

    button:first-child {
      margin-right: 0.5rem;
    }
  }
`;
