import { FC } from 'react';
import { Task as TaskType } from './types.ts';
import Task from './Task/Task.tsx';

interface Props {
  taskList: TaskType[];
  selected: boolean;
  day: number;
}

const TaskList: FC<Props> = ({ taskList }) => {
  return (
    <div>
      {taskList.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
