import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Color, Task } from '../components/TaskList/types.ts';
import useCalenderContext from '../hooks/useCalendarContext.ts';
import { tasksMock } from '../mock';

interface TasksGroup {
  tasks: Task[];
  day: number;
  month: number;
  year: number;
}

interface TaskContextType {
  colors: Color[];
  addTask: (day: number, month: number, year: number) => void;
  removeTask: (day: number, taskId: number) => void;
  editTask: (day: number, ewTask: Task) => void;
  reassignTask: (
    day: number,
    oldDay: number,
    taskId: number,
    nextToTaskId: number | 'start'
  ) => void;
  getTasksGroup: (day: number, month: number, year: number) => TasksGroup | undefined;
  setSearch: (search: string) => void;
}

type updateCallback = (tasksGroup: TasksGroup, day: number) => void;

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasksGroups, setTasksGroups] = useState<TasksGroup[]>(tasksMock);
  const [filteredTasksGroups, setFilteredTasksGroups] = useState<TasksGroup[]>([]);
  const [search, setSearch] = useState('');
  const {
    selectedMonth: { month, year },
  } = useCalenderContext();

  const theme = useTheme();

  useEffect(() => {
    filterTasks(search);
  }, [tasksGroups, search]);

  const colors: Color[] = [
    { id: 0, color: theme.colors.green },
    { id: 1, color: theme.colors.lightGreen },
    { id: 2, color: theme.colors.yellow },
    { id: 3, color: theme.colors.orange },
    { id: 4, color: theme.colors.purple },
  ];

  const getTasksGroupByDay = (day: number) => {
    return tasksGroups.find(
      (taskGroup) => taskGroup.month === month && taskGroup.year === year && taskGroup.day === day
    );
  };

  const updateSelectedTasksGroup = (days: number[], callback: updateCallback) => {
    const newTasksGroups = tasksGroups.map((taskGroup) => {
      if (taskGroup.month === month && taskGroup.year === year && days.includes(taskGroup.day)) {
        callback(taskGroup, taskGroup.day);
      }
      return taskGroup;
    });

    setTasksGroups(structuredClone(newTasksGroups));
  };

  const addTask = (day: number) => {
    const newTask: Task = {
      id: +new Date(),
      text: '',
      colors: [],
      new: true,
    };

    const tasksGroup = getTasksGroupByDay(day);
    if (tasksGroup) {
      updateSelectedTasksGroup([day], (tasksGroup) => {
        tasksGroup.tasks.push(newTask);
      });
    } else {
      tasksGroups.push({
        tasks: [newTask],
        day,
        month,
        year,
      });
      setTasksGroups(structuredClone(tasksGroups));
    }
  };

  const removeTask = (day: number, taskId: number) => {
    updateSelectedTasksGroup([day], (tasksGroup) => {
      tasksGroup.tasks = tasksGroup.tasks.filter((task) => task.id !== taskId);
    });
  };

  const editTask = (day: number, newTask: Task) => {
    updateSelectedTasksGroup([day], (tasksGroup) => {
      tasksGroup.tasks = tasksGroup.tasks.map((task) => (task.id === newTask.id ? newTask : task));
    });
  };

  const reorderTask = (
    tasksGroup: TasksGroup,
    taskToReorder: Task,
    nextToTaskId: number | 'start'
  ) => {
    if (taskToReorder.id === nextToTaskId) {
      return tasksGroup.tasks;
    }
    tasksGroup.tasks = tasksGroup.tasks.filter((task) => task.id !== taskToReorder.id);
    if (nextToTaskId === 'start') {
      tasksGroup.tasks.unshift(taskToReorder);
    } else {
      tasksGroup.tasks = tasksGroup.tasks.reduce((accumulator: Task[], task: Task) => {
        if (task.id === nextToTaskId) {
          return [...accumulator, task, taskToReorder];
        }
        return [...accumulator, task];
      }, []);
    }

    return tasksGroup.tasks;
  };

  const reassignTask = (
    dayToReassign: number,
    dayOfReassign: number,
    taskId: number,
    nextToTaskId: number | 'start'
  ) => {
    const tasksGroupOfReassign = getTasksGroupByDay(dayOfReassign);
    if (!tasksGroupOfReassign) {
      return;
    }

    let tasksGroupToReassign = getTasksGroupByDay(dayToReassign);
    if (!tasksGroupToReassign) {
      tasksGroupToReassign = {
        tasks: [],
        day: dayToReassign,
        month,
        year,
      };
      tasksGroups.push(tasksGroupToReassign);
    }

    const tasksGroupOfReassignTasks = tasksGroupOfReassign.tasks.filter((task) => {
      if (task.id === taskId) {
        if (dayToReassign !== dayOfReassign) {
          tasksGroupToReassign.tasks.push(task);
        }

        if (nextToTaskId) {
          tasksGroupToReassign.tasks = reorderTask(tasksGroupToReassign, task, nextToTaskId);
        }

        return false;
      }
      return true;
    });

    updateSelectedTasksGroup([dayOfReassign, dayToReassign], (tasksGroup, day) => {
      if (dayOfReassign === day && dayToReassign === day) {
        tasksGroup.tasks = tasksGroupToReassign.tasks;
      } else {
        if (day === dayOfReassign) {
          tasksGroup.tasks = tasksGroupOfReassignTasks;
        }

        if (day === dayToReassign) {
          tasksGroup.tasks = tasksGroupToReassign.tasks;
        }
      }
    });
  };

  const filterTasks = (search: string) => {
    const filtered = structuredClone(tasksGroups).map((tasksGroup) => {
      tasksGroup.tasks = tasksGroup.tasks.filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase())
      );
      return tasksGroup;
    });

    setFilteredTasksGroups(filtered);
  };

  const getFilteredTasksGroup = (day: number, month: number, year: number) => {
    return filteredTasksGroups.find(
      (taskGroup) => taskGroup.month === month && taskGroup.year === year && taskGroup.day === day
    );
  };

  return (
    <TaskContext.Provider
      value={{
        colors,
        addTask,
        reassignTask,
        getTasksGroup: getFilteredTasksGroup,
        removeTask,
        editTask,
        setSearch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
