import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ToDoActions from './todo.action';
import ToDo from './todo.model';

@Injectable()
export class ToDoEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  private ApiURL: string = 'https://localhost:44308/api/ToDo';

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetTodoAction),
      mergeMap(action =>
        this.http.get(this.ApiURL).pipe(
          map((data: ToDo[]) => {
            return ToDoActions.SuccessGetTodoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorTodoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateTodoAction),
      mergeMap(action =>
        this.http
          .post(this.ApiURL, JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: ToDo) => {
              return ToDoActions.SuccessCreateTodoAction({ payload: data });
            }),
            catchError((error: Error) => {
              return of(ToDoActions.ErrorTodoAction(error));
            })
          )
      )
    )
  );
}
