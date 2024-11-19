import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() statusUpdate = new EventEmitter<Task>();
  @Output() descriptionUpdate = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  isEditing = false;
  editedDescription = '';

  toggleEdit() {
    if (!this.isEditing) {
      this.editedDescription = this.task.description;
    }
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.updateDescription();
    }
  }

  updateDescription() {
    if (this.editedDescription.trim() !== '' && this.editedDescription !== this.task.description) {
      this.task.description = this.editedDescription;
      this.descriptionUpdate.emit(this.task);
    }
    this.isEditing = false;
  }

  onStatusChange() {
    this.statusUpdate.emit(this.task);
  }

  onDelete() {
    this.deleteTask.emit(this.task.id);
  }
}

