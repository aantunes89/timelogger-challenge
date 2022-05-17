import styled from "styled-components";

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-field {
    label {
      margin: 8px 0;
      display: block;
      color: var(--text-body);
    }
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 3rem;

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

  footer {
    display: flex;
    align-items: center;

    justify-content: space-between;
  }

  .action-buttons__wrapper {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    justify-content: flex-end;

    button:first-child {
      margin-right: 0.5rem;
    }
  }

  .total-description {
    color: var(--text-title);
    font-size: 1.2rem;
  }
`;
