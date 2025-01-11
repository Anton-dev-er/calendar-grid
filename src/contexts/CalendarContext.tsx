import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { getCurrentDate } from '../utils/date.ts';
import { useDateApi } from '../api/date/api.ts';
import { Holiday } from '../api/date/types.ts';

interface CalendarDay {
  day: number | null;
  month: number | null;
}

interface SelectedMonth {
  month: number;
  year: number;
}

interface CalendarContextType {
  selectedCalendarDay: CalendarDay;
  setSelectedCalendarDay: (day: CalendarDay) => void;
  selectedMonth: SelectedMonth;
  selectedWeek: number | null;
  setSelectedWeek: (week: number | null) => void;
  publicHolidays: Holiday[];
  setNewMonth: (month: number, year: number) => void;
}

export const CalendarContext = createContext<CalendarContextType>({} as CalendarContextType);

export const CalendarContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<CalendarDay>({
    day: null,
    month: null,
  });
  const [selectedMonth, setSelectedMonth] = useState<SelectedMonth>({
    month: 0,
    year: 0,
  });
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const {
    getPublicHolidays: { getPublicHolidays, data: publicHolidays },
  } = useDateApi(selectedMonth.year || 2025);

  const setNewMonth = (month: number, year: number) => {
    setSelectedMonth({
      month,
      year,
    });
  };

  useEffect(() => {
    const currentDate = getCurrentDate();

    setNewMonth(currentDate.month, currentDate.year);

    void getPublicHolidays();
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        selectedCalendarDay,
        setSelectedCalendarDay,
        selectedMonth,
        publicHolidays: publicHolidays || [],
        setNewMonth,
        selectedWeek,
        setSelectedWeek,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
