import styled from 'styled-components';

export const Holiday = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGreen};
  padding: ${({ theme }) => theme.spacing};
  border-radius: 4px;
  margin: 0 ${({ theme }) => theme.spacing};
`;
