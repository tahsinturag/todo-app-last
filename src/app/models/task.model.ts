export interface Task {
  id: number;
  description: string;
  status: 'Pending' | 'Doing';
}
