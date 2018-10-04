import { environment } from '../environments/environment';
import {Todo} from './todo';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Promise<Todo[]> {
    log('Trying to call ' + this.baseUrl + '/api/todos/');
    return this.http.get(this.baseUrl + '/api/todos/')
      .toPromise()
      .then(response => response as Todo[])
      .catch(this.handleError);
  }

  createTodo(todoData: Todo): Promise<Todo> {
    log('Trying to call ' + this.baseUrl + '/api/todos/ with data: ' + todoData);
    return this.http.post(this.baseUrl + '/api/todos/', todoData)
      .toPromise().then(response => response as Todo)
      .catch(this.handleError);
  }

  updateTodo(todoData: Todo): Promise<Todo> {
    return this.http.put(this.baseUrl + '/api/todos/' + todoData.id, todoData)
      .toPromise()
      .then(response => response as Todo)
      .catch(this.handleError);
  }

  deleteTodo(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/todos/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  // 2a
  moveTodoUp(todo: Todo): Promise<{}> {
    return this.http.put(this.baseUrl + '/api/todos/moveup/' + todo.id, todo)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  // 2a
  moveTodoDown(todo: Todo): Promise<{}> {
    return this.http.put(this.baseUrl + '/api/todos/movedown/' + todo.id, todo)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
