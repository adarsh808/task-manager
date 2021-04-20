import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input()
  task: any;
  @Output("openModal")
  openModal: EventEmitter<any> = new EventEmitter();
    
  priorityList: any = { 1: "Low", 2: "Meduim", 3: "High" };

  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit() { }


  updateTask() {
    this.taskService.setTask(this.task);
    this.router.navigateByUrl("/create-task");
  }
  deleteTask() {
    this.openModal.emit(this.task)
  }
}