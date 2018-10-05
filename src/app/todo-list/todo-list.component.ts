import {Todo} from '../todo';
import {TodoService} from '../todo.service';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  newTodo: Todo = new Todo();


  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().then(todos => this.todos = todos);
  }

  createTodo(todoForm: NgForm): void {
    this.todoService.createTodo(this.newTodo).then(createTodo => {
      todoForm.reset();
      this.newTodo = new Todo();
      this.todos.unshift(createTodo);
    });
  }

}
