import styled from 'styled-components';

export const Task = styled.div<{ $editable: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  cursor: ${({ $editable }) => ($editable ? 'unset' : 'grab')};
  padding: ${({ theme }) => theme.spacing};
  margin: 0 ${({ theme }) => theme.spacing};
  border-radius: 4px;
`;

export const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;
