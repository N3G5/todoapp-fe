export class Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  ranking: number; // 2a
  priority: string; // 1a
  // 1a
  constructor() {
    this.priority = 'LOW';
  }
}
