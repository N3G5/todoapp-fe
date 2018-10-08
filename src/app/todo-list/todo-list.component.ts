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
  selectedTodo: Todo = new Todo();


  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().then(todos => this.todos = todos);
  }

  createTodo(todoForm: NgForm): void {
    // 3b: if an todo is selected, add this id as parent for the new todo
    if (this.selectedTodo.id && this.selectedTodo.id !== '') {
      this.newTodo.upperTask = this.selectedTodo.id;
    }
    this.todoService.createTodo(this.newTodo).then(createTodo => {
      todoForm.reset();
      this.newTodo = new Todo();
      // find selected todo parent item & add child
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === this.selectedTodo.id) {          
          // this.todos[i].unshiftChild(createTodo);
          this.todos[i].childs.unshift(createTodo);
          break;
        }
      }
      this.selectedTodo = new Todo();
    });
  }

  selectTodo(todo: Todo) {
    if (this.selectedTodo === todo) {
      this.selectedTodo = new Todo();
    } else {
      this.selectedTodo = todo;
    }

  }

}
