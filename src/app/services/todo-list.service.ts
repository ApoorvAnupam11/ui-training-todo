import { Injectable } from '@angular/core';
import { TodoItem, Changes } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';
const defaultTodoList = [
  { title: 'Sample todos' },
  { title: 'have breakfast' },
  { title: 'take a shower' },
  { title: 'attend the meeting' },
  { title: 'write notes' },
  { title: 'do assignment' }
];

@Injectable()
export class TodoListService {
  todoList: TodoItem[];

  constructor(private storageService: StorageService) {
    this.todoList =
      storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  saveList(): void {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  getTodoList(): TodoItem[] {
    return this.todoList;
  }

  addItem(item: TodoItem): void {
    this.todoList.push(item);
    this.saveList();
  }

  updateItem(item: TodoItem, changes: Changes): void {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    this.saveList();
  }

  deleteItem(item: TodoItem): void {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }
}
