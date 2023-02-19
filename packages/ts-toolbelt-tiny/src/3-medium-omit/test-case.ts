import { _Omit } from './template';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = _Omit<Todo, 'description' | 'title'>;

const todo_omit: TodoPreview = {
  completed: false,
};
