import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext.tsx';

const useTaskContext = () => useContext(TaskContext);

export default useTaskContext;
