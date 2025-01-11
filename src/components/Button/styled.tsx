import styled from 'styled-components';

export const Button = styled.button<{ $active: boolean }>`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  color: ${({ theme }) => theme.colors.black};
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  border: none;
  font-weight: 500;
  width: 100%;
  height: fit-content;
  margin-top: ${({ theme }) => theme.spacing};
  margin-right: ${({ theme }) => theme.spacing};
  opacity: ${({ $active }) => ($active ? 0.8 : 1)};

  &:hover {
    opacity: 0.8;
  }
`;
