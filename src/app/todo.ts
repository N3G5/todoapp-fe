export class Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  ranking: number; // 2a
  priority: string; // 1a
  upperTask: string;
  childs: Todo[];

  constructor() {
    this.priority = 'LOW';
  }
/*
  unshiftChild(todo: Todo) {
    if (this.childs == null) {
      this.childs = new Array<Todo>();
    }
    this.childs.unshift(todo);
  }
*/
}
