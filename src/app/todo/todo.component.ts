import {Component, OnDestroy, OnInit} from '@angular/core';
import TodoState from './todo.state';
import {Store, select} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import Todo from './todo.model';
import {map} from 'rxjs/operators';
import * as ToDoActions from './todo.action';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo$: Observable<TodoState>;
  ToDoSubscription: Subscription;
  TodoList: Todo[] = [];
  Title = '';
  IsCompleted = false;
  todoError: Error = null;
  constructor(private store: Store<{ todos: TodoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.ToDoSubscription = this.todo$.pipe(
      map(x => {
        this.TodoList = x.Todos;
        this.todoError = x.ToDoError;
      })
    ).subscribe();

    this.store.dispatch(ToDoActions.BeginGetTodoAction());
  }

  createToDo() {
    const todo: Todo = { Title: this.Title, IsCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateTodoAction({ payload: todo }));
    this.Title = '';
    this.IsCompleted = false;
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }

}
