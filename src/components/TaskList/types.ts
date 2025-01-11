export interface Color {
  id: number;
  color: string;
}

export interface Task {
  id: number;
  text: string;
  colors: Color[];
  new: boolean;
}
