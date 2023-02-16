import { _Readonly } from './template';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: _Readonly<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
