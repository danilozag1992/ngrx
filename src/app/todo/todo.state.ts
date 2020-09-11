import Todo from './todo.model';

export default class TodoState{
  Todos: Array<Todo>;
  ToDoError: Error;
}

export const initializeState = (): TodoState => {
  return { Todos: Array<Todo>(), ToDoError: null };
};
