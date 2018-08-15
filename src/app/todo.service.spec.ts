import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, HttpClient, HttpClientModule, HttpHandler]
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
