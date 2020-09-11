import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.action';
import Todo from './todo.model';
import TodoState, { initializeState } from './todo.state';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(TodoActions.GetTodoAction, state => state),

  on(TodoActions.CreateTodoAction, (state: TodoState, todo: Todo) => {
    return { ...state, Todos: [...state.Todos, todo], ToDoError: null };
  }),
  on(TodoActions.SuccessGetTodoAction, (state: TodoState, { payload }) => {
    return{ ...state, Todos: payload };
  }),
  on(TodoActions.SuccessCreateTodoAction, (state: TodoState, { payload }) => {
    return { ...state, Todos: [...state.Todos, payload], ToDoError: null };
  }),
  on(TodoActions.ErrorTodoAction, (state: TodoState, error: Error) => {
    console.log(error);
    return { ...state, ToDoError: error };
  })
);

export function TodoReducer(state: TodoState | undefined, action: Action) {
  return reducer(state, action);
}

