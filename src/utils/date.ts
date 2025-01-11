const getCurrentDate = () => {
  const currentTime = new Date();

  const month = currentTime.getMonth();
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();

  return {
    day,
    month,
    year,
  };
};

const monthProperties = (month: number, year: number) => {
  const firstDay = new Date(year, month, 0).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month + 1, 0).getDay() - 1;
  return {
    daysBefore: Array.from(Array(firstDay).keys()).reverse(),
    days: Array.from(Array(daysInMonth).keys()),
    daysAfter: Array.from(Array(6 - lastDay).keys()),
  };
};

const getWeekCount = (month: number, year: number) => {
  const monthProps = monthProperties(month, year);
  return (monthProps.daysBefore.length + monthProps.days.length + monthProps.daysAfter.length) / 7;
};

const mappedMonths: { [name: number]: string } = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Oct',
  11: 'Dec',
};

const mappedFullNameMonth: { [name: number]: string } = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const mappedDays: { [name: number]: string } = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
};

const getPrevMonth = (month: number, year: number) => {
  let prevMonth = month - 1;
  if (prevMonth < 0) {
    prevMonth = 11;
    year = year - 1;
  }

  const daysInMonth = new Date(year, prevMonth + 1, 0).getDate();

  return { month: prevMonth, year, daysInMonth };
};

const getNextMonth = (month: number, year: number) => {
  let nextMonth = month + 1;
  if (nextMonth > 11) {
    nextMonth = 0;
    year = year + 1;
  }

  const daysInMonth = new Date(year, nextMonth + 1, 0).getDate();

  return { month: nextMonth, year, daysInMonth };
};

const parseDateToString = (day: number, month: number, year: number): string => {
  day = day + 1;
  month = month + 1;
  const parsedDay = `${day}`.length === 2 ? `${day}` : `0${day}`;
  const parsedMonth = `${month}`.length === 2 ? `${month}` : `0${month}`;

  return `${year}-${parsedMonth}-${parsedDay}`;
};

export {
  getCurrentDate,
  monthProperties,
  mappedMonths,
  getPrevMonth,
  getNextMonth,
  mappedDays,
  mappedFullNameMonth,
  parseDateToString,
  getWeekCount,
};
