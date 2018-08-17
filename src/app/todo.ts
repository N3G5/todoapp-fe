export class Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: string;
  constructor() {
    this.priority = 'LOW';
  }
}
