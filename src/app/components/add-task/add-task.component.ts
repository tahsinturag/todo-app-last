import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  newTaskDescription: string = '';
  @Output() taskAdd = new EventEmitter<string>();

  addTask() {
    if (this.newTaskDescription.trim()) {
      this.taskAdd.emit(this.newTaskDescription);
      this.newTaskDescription = '';
    }
  }
}
