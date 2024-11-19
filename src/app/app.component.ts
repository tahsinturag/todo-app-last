import {Component, OnInit} from '@angular/core';
import { Task } from './models/task.model';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {AddTaskComponent} from './components/add-task/add-task.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SearchBarComponent, AddTaskComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: any = [];
  searchTerm: string = '';

  constructor(private http:HttpClient) {
  }

  ngOnInit() {
    this.filterTasks()
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    // this.filterTasks();
    this.filteredTasks = this.tasks.filter(task =>
      task.description.toLowerCase().includes(this.searchTerm)
    );
  }

  filterTasks() {
    this.http.get('http://192.168.0.172:8080/task/all').subscribe({
      next: (result) => {
       this.filteredTasks = result;
      }
    })

  }

  onAddTask(description: string) {
    const newTask: Task = {
      id: Date.now(),
      description:description
    };
    console.log(newTask)
    this.http.post('http://192.168.0.172:8080/task/create', newTask).subscribe({
      next:(res)=>{
        this.tasks.push(newTask);
        this.filterTasks();
      }
    })


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
