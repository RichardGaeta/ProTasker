export interface Task {
  id: number;
  name: string;
  completed: boolean;
  taskPriority: number;
  date: Date | null;
  desc: string;
  subTasks: Number[];
}