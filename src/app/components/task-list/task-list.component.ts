import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import {NgForOf} from '@angular/common';
import {TaskItemComponent} from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    TaskItemComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() statusUpdate = new EventEmitter<Task>();
  @Output() descriptionUpdate = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  onStatusUpdate(task: Task) {
    this.statusUpdate.emit(task);
  }

  onDescriptionUpdate(task: Task) {
    this.descriptionUpdate.emit(task);
  }

  onDeleteTask(taskId: number) {
    this.deleteTask.emit(taskId);
  }
}
