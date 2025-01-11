import CalendarDay from './CalendarDay/CalendarDay.tsx';
import useCalenderContext from '../../hooks/useCalendarContext.ts';
import useTaskContext from '../../hooks/useTaskContext.ts';
import { getNextMonth, getPrevMonth, mappedDays, monthProperties } from '../../utils/date.ts';
import Typography from '../Typography/Typography.tsx';
import * as S from './styled.tsx';
import { useEffect, useState } from 'react';

interface MonthProps {
  daysBefore: number[];
  days: number[];
  daysAfter: number[];
}

const CalendarGrid = () => {
  const { setSelectedCalendarDay, selectedMonth, selectedWeek } = useCalenderContext();
  const { reassignTask } = useTaskContext();
  const [monthProps, setMonthProps] = useState<MonthProps>({
    daysBefore: [],
    days: [],
    daysAfter: [],
  });

  useEffect(() => {
    let monthProps = monthProperties(selectedMonth.month, selectedMonth.year);
    if (selectedWeek !== null) {
      // week starts from 0
      const week = (selectedWeek + 1) * 7;
      const daysBefore = monthProps.daysBefore.slice(week - 7, week);

      const days = [...monthProps.daysBefore, ...monthProps.days]
        .slice(week - 7, week)
        .slice(daysBefore.length, 7);

      const daysAfter = days.length + daysBefore.length === 7 ? [] : monthProps.daysAfter;

      monthProps = {
        daysBefore,
        days,
        daysAfter,
      };
    }
    setMonthProps(monthProps);
  }, [selectedMonth, selectedWeek]);

  const handleDoubleClick = (e: any) => {
    const isNotClickable = !!e.target.closest("[data-double-click='false']");

    if (isNotClickable) {
      return;
    }

    const calendarDay = e.target.closest("[data-component='calendar-day']");
    if (calendarDay) {
      setSelectedCalendarDay({
        day: +calendarDay.dataset.day,
        month: +calendarDay.dataset.month,
      });
    }
  };

  const onMouseDown = (e: any) => {
    const task = e.target.closest("[data-component='task']");
    const isNotDraggable = !!e.target.closest("[data-draggable='false']");

    if (!task || isNotDraggable) {
      return;
    }

    let prevCalendarDay: HTMLElement | null = null;
    let prevAnchor: HTMLElement | null = null;

    const calendarDay = task.closest("[data-component='calendar-day']");
    calendarDay.ondragstart = () => false;

    const width = task.clientWidth;

    let shiftX = e.clientX - task.getBoundingClientRect().left;
    let shiftY = e.clientY - task.getBoundingClientRect().top;

    const clonedTask = task.cloneNode(true);
    document.body.append(clonedTask);
    clonedTask.style.position = 'absolute';
    clonedTask.style.zIndex = 99999;
    clonedTask.style.width = width - 16 + 'px';
    clonedTask.style.opacity = 0.6;

    const moveAt = (pageX: number, pageY: number) => {
      clonedTask.style.left = pageX - shiftX - 8 + 'px';
      clonedTask.style.top = pageY - shiftY + 'px';
    };

    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e: any) => {
      moveAt(e.pageX, e.pageY);

      clonedTask.hidden = true;
      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      clonedTask.hidden = false;

      if (!elemBelow) return;

      const calendarDayBelow = elemBelow.closest("[data-component='calendar-day']") as HTMLElement;
      if (prevCalendarDay !== calendarDayBelow) {
        if (calendarDayBelow) {
          setSelectedCalendarDay({
            day: +(calendarDayBelow.dataset.day as string),
            month: +(calendarDayBelow.dataset.day as string),
          });
        }

        prevCalendarDay = calendarDayBelow as HTMLElement;

        if (prevAnchor) {
          prevAnchor.style.opacity = '0';
          prevAnchor = null;
        }
      }

      const anchorWrapper = elemBelow.closest("[data-anchor-active='true']") as HTMLElement;
      const anchor = anchorWrapper?.querySelector("[data-component='task-anchor']") as HTMLElement;

      if (prevAnchor !== anchor) {
        if (prevAnchor) prevAnchor.style.opacity = '0';
        if (anchor) anchor.style.opacity = '1';

        prevAnchor = anchor as HTMLElement;
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    clonedTask.onmouseup = () => {
      const oldDay = +calendarDay.dataset.day;
      const taskId = +clonedTask.dataset.id;
      let day;
      if (prevCalendarDay) {
        day = parseInt(prevCalendarDay.dataset.day as string);
      } else {
        day = oldDay;
      }

      let nextToTaskId: number | 'start' = 0;
      if (prevAnchor) {
        prevAnchor.style.opacity = '0';
        const anchorParent = prevAnchor.previousElementSibling as HTMLElement;

        if (anchorParent.dataset.component === 'task') {
          nextToTaskId = parseInt(anchorParent.dataset.id as string);
        } else {
          nextToTaskId = 'start';
        }
      }

      reassignTask(day, oldDay, taskId, nextToTaskId);
      setSelectedCalendarDay({ day: null, month: null });

      document.removeEventListener('mousemove', onMouseMove);
      clonedTask.onmouseup = null;
      clonedTask.remove();
    };
  };

  const prevMonth = getPrevMonth(selectedMonth.month, selectedMonth.year);
  const nextMonth = getNextMonth(selectedMonth.month, selectedMonth.year);

  return (
    <S.CalendarGrid
      onDoubleClick={handleDoubleClick}
      onMouseDown={onMouseDown}
      $isWeek={selectedWeek !== null}
    >
      {Object.values(mappedDays).map((day) => (
        <Typography key={day} align="center">
          {day}
        </Typography>
      ))}

      {monthProps.daysBefore.map((day) => (
        <CalendarDay
          key={day}
          day={prevMonth.daysInMonth - 1 - day}
          month={prevMonth.month}
          year={prevMonth.year}
          disabled
        />
      ))}

      {monthProps.days.map((day) => (
        <CalendarDay key={day} day={day} month={selectedMonth.month} year={selectedMonth.year} />
      ))}

      {monthProps.daysAfter.map((day) => (
        <CalendarDay key={day} day={day} month={nextMonth.month} year={nextMonth.year} disabled />
      ))}
    </S.CalendarGrid>
  );
};

export default CalendarGrid;
