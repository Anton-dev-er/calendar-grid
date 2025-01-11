import { FC } from 'react';
import Holiday from './Holiday/Holiday.tsx';
import { Holiday as HolidayType } from '../../api/date/types.ts';

interface Props {
  todayPublicHolidays: HolidayType[];
}

const HolidayList: FC<Props> = ({ todayPublicHolidays }) => {
  return (
    <div>
      {todayPublicHolidays.map((holiday) => (
        <Holiday holiday={holiday} key={holiday.date} />
      ))}
    </div>
  );
};

export default HolidayList;
