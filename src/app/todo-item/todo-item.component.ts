import {Todo} from '../todo';
import {TodoService} from '../todo.service';
import {Component, OnInit, Input} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Input() parent: any;

  editing = false;
  editingTodo: Todo = new Todo();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
      .then(() => {
        this.parent.getTodos();
      });
  }

  updateTodo(todoData: Todo): void {
    console.log(todoData);
    this.todoService.updateTodo(todoData)
      .then(updatedTodo => {
        this.parent.getTodos();
        this.clearEditing();
      });
  }

  toggleCompleted(todoData: Todo): void {
    todoData.completed = !todoData.completed;
    this.todoService.updateTodo(todoData)
      .then(updatedTodo => {
        this.parent.getTodos();
      });
  }

  editTodo(todoData: Todo): void {
    this.editing = true;
    Object.assign(this.editingTodo, todoData);
  }

  clearEditing(): void {
    this.editingTodo = new Todo();
    this.editing = false;
  }

  // 2a
  moveTodoUp(todo: Todo): void {
    this.todoService.moveTodoUp(todo).then(() => {
      this.parent.getTodos();
    });
  }

  // 2a
  moveTodoDown(todo: Todo): void {
    this.todoService.moveTodoDown(todo).then(() => {
      this.parent.getTodos();
    });
  }

}
