import { FC, useEffect, useState } from 'react';
import TaskList from '../../TaskList/TaskList.tsx';
import useCalenderContext from '../../../hooks/useCalendarContext.ts';
import * as S from './styled.tsx';
import useTaskContext from '../../../hooks/useTaskContext.ts';
import { mappedMonths, parseDateToString } from '../../../utils/date.ts';
import IconButton from '../../IconButton/IconButton.tsx';
import Typography from '../../Typography/Typography.tsx';
import HolidayList from '../../HolidayList/HolidayList.tsx';
import TaskAnchor from '../../TaskAnchor/TaskAnchor.tsx';

interface Props {
  day: number;
  month: number;
  year: number;
  disabled?: boolean;
}

const CalendarDay: FC<Props> = ({ day, month, year, disabled = false }) => {
  const [selected, setSelected] = useState(false);
  const { selectedCalendarDay, publicHolidays } = useCalenderContext();
  const { getTasksGroup, addTask } = useTaskContext();

  useEffect(() => {
    setSelected(day === selectedCalendarDay.day);
  }, [selectedCalendarDay.day]);

  const handleAddTask = () => {
    addTask(day, month, year);
  };

  const tasksGroup = getTasksGroup(day, month, year);

  const todayPublicHolidays = publicHolidays.filter(
    (holiday) => holiday.date === parseDateToString(day, month, year)
  );

  return (
    <S.CalendarDay
      $disabled={disabled}
      $selected={selected}
      data-component="calendar-day"
      data-day={day}
      data-month={month}
      data-year={year}
    >
      {selected && (
        <S.AddTask>
          <IconButton onClick={handleAddTask} icon="plus.svg" />
        </S.AddTask>
      )}
      <TaskAnchor active={!todayPublicHolidays.length}>
        <Typography align="left">
          {day + 1} {day + 1 === 1 && mappedMonths[month]}
        </Typography>
      </TaskAnchor>
      <HolidayList todayPublicHolidays={todayPublicHolidays} />
      <TaskList taskList={tasksGroup?.tasks || []} selected={selected} day={day} />
    </S.CalendarDay>
  );
};

export default CalendarDay;
