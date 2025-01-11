import { Task } from '../components/TaskList/types.ts';

const tasksMock: {
  tasks: Task[];
  month: number;
  year: number;
  day: number;
}[] = [
  {
    tasks: [
      {
        id: 1736600811131,
        text: 'task 1 upd',
        colors: [],
        new: false,
      },
    ],
    day: 0,
    month: 0,
    year: 2025,
  },
  {
    tasks: [
      {
        id: 1736600827977,
        text: 'task 3',
        colors: [
          {
            id: 3,
            color: '#ffa945',
          },
          {
            id: 2,
            color: '#f7d41b',
          },
        ],
        new: false,
      },
      {
        id: 1736600834336,
        text: 'task 4',
        colors: [
          {
            id: 4,
            color: '#c178df',
          },
          {
            id: 1,
            color: '#54ea97',
          },
        ],
        new: false,
      },
      {
        id: 1736600816804,
        text: 'task 2',
        colors: [
          {
            id: 1,
            color: '#54ea97',
          },
          {
            id: 2,
            color: '#f7d41b',
          },
        ],
        new: false,
      },
    ],
    day: 2,
    month: 0,
    year: 2025,
  },
  {
    tasks: [],
    day: 1,
    month: 0,
    year: 2025,
  },
  {
    tasks: [],
    day: 3,
    month: 0,
    year: 2025,
  },
  {
    tasks: [
      {
        id: 1736603379142,
        text: 'Prev month task',
        colors: [
          {
            id: 2,
            color: '#f7d41b',
          },
          {
            id: 1,
            color: '#54ea97',
          },
          {
            id: 3,
            color: '#ffa945',
          },
        ],
        new: false,
      },
    ],
    day: 30,
    month: 11,
    year: 2024,
  },
  {
    tasks: [
      {
        id: 1736603398773,
        text: 'test same day',
        colors: [],
        new: false,
      },
    ],
    day: 0,
    month: 11,
    year: 2024,
  },
];
export { tasksMock };
