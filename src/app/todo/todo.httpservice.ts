import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ToDo from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
toDo = ['1', '2', '3', '4' , '5', '2', '1'];

  getToDos(): Observable<ToDo[]> {
    return this.toDo;
  }

  createToDos(payload: ToDo): Observable<ToDo> {
    this.toDo = [];
    return this.toDo;
  }
}
