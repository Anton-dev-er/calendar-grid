import Button from '../Button/Button.tsx';
import Input from '../Input/Input.tsx';
import useTaskContext from '../../hooks/useTaskContext.ts';
import * as S from './styled.tsx';
import Typography from '../Typography/Typography.tsx';
import IconButton from '../IconButton/IconButton.tsx';
import useCalendarContext from '../../hooks/useCalendarContext.ts';
import { getNextMonth, getPrevMonth, getWeekCount, mappedFullNameMonth } from '../../utils/date.ts';

const CalendarHeader = () => {
  const { setSearch } = useTaskContext();
  const { selectedMonth, setNewMonth, setSelectedWeek, selectedWeek } = useCalendarContext();

  const handlePrevMonth = () => {
    const prevMonth = getPrevMonth(selectedMonth.month, selectedMonth.year);
    const weekCount = getWeekCount(prevMonth.month, prevMonth.year);

    if (selectedWeek === null) {
      setNewMonth(prevMonth.month, prevMonth.year);
    } else {
      const prevWeek = selectedWeek - 1;
      if (prevWeek < 0) {
        setSelectedWeek(weekCount - 1);
        setNewMonth(prevMonth.month, prevMonth.year);
      } else {
        setSelectedWeek(prevWeek);
      }
    }
  };

  const handleNextMonth = () => {
    const weekCount = getWeekCount(selectedMonth.month, selectedMonth.year);

    const nextMonth = getNextMonth(selectedMonth.month, selectedMonth.year);
    if (selectedWeek === null) {
      setNewMonth(nextMonth.month, nextMonth.year);
    } else {
      const nextWeek = selectedWeek + 1;
      console.log('after', nextWeek + 1, weekCount);
      if (nextWeek + 1 > weekCount) {
        setSelectedWeek(0);
        setNewMonth(nextMonth.month, nextMonth.year);
      } else {
        setSelectedWeek(nextWeek);
      }
    }
  };

  const handleWeekSelect = () => {
    setSelectedWeek(0);
  };

  const handleMonthSelect = () => {
    setSelectedWeek(null);
  };

  return (
    <S.CalendarHeader>
      <div>
        <Button onClick={handleWeekSelect} active={selectedWeek !== null}>
          Week
        </Button>
        <Button onClick={handleMonthSelect} active={selectedWeek === null}>
          Month
        </Button>
      </div>
      <div>
        <IconButton icon="arrow-left" onClick={handlePrevMonth} />
        <Typography>
          {mappedFullNameMonth[selectedMonth.month]} {selectedMonth.year}
        </Typography>
        <IconButton icon="arrow-right" onClick={handleNextMonth} />
      </div>
      <div>
        <Input id="search-task" onChange={setSearch} placeholder="Search task ..." />
      </div>
    </S.CalendarHeader>
  );
};

export default CalendarHeader;
