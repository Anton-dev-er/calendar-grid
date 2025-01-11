import styled from 'styled-components';

export const CalendarGrid = styled.div<{ $isWeek: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 35px repeat(6, ${({ $isWeek }) => ($isWeek ? '600px' : '260px')});
`;
