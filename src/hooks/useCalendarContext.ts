import { useContext } from 'react';
import { CalendarContext } from '../contexts/CalendarContext.tsx';

const useCalenderContext = () => useContext(CalendarContext);

export default useCalenderContext;
