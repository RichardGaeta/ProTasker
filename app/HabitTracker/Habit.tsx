export interface Habit {
  id: number;
  name: string;
  category: string;
  completed: boolean[];
  streak: number;
  interval: boolean[];
}
