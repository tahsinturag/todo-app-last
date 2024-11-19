import { Component } from '@angular/core';
import { Task } from './models/task.model';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {AddTaskComponent} from './components/add-task/add-task.component';
import {TaskListComponent} from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SearchBarComponent, AddTaskComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task =>
      task.description.toLowerCase().includes(this.searchTerm)
    );
  }

  onAddTask(description: string) {
    const newTask: Task = {
      id: Date.now(),
      description,
      status: 'Pending'
    };
    this.tasks.push(newTask);
    this.filterTasks();
  }

  onStatusUpdate(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
      this.filterTasks();
    }
  }

  onDescriptionUpdate(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
      this.filterTasks();
    }
  }

  onDeleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.filterTasks();
  }
}
