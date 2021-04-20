import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { TaskService } from "../services/task.service";
import { formatDate } from "@angular/common";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
})
export class CreateTaskComponent implements OnInit {
  taskFormDetails: FormGroup;
  priorityList: Array<any> = [{ 1: "Low" }, { 2: "Medium" }, { 3: "High" }];
  userList: Array<any>;
  updateTask: any;
  pageTitle: string = "";
  updateTaskSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.updateTaskSubscription = this.taskService
      .getTask()
      .subscribe((task) => {
        this.updateTask = task;
        this.pageTitle = this.updateTask ? "Update Task" : "Create a new Task";
        this.taskFormDetails = this.createTaskForm();
      });
    this.taskService.listUsers().subscribe((userList) => {
      this.userList = userList.users;
    });
  }

  ngOnDestroy() {
    this.taskService.setTask(null);
    this.updateTaskSubscription.unsubscribe();
  }
  get f() {
    return this.taskFormDetails.controls;
  }

  createTaskForm() {
    return this.formBuilder.group({
      message: [
        this.updateTask && this.updateTask.message,
        Validators.required,
      ],
      due_date:
        this.updateTask &&
        this.updateTask.due_date &&
        formatDate(this.updateTask.due_date, "yyyy-MM-dd", "en"),
      priority: this.updateTask && this.updateTask.priority,
      assigned_to: this.updateTask && this.updateTask.assigned_to,
    });
  }

  resetForm() {
    this.taskFormDetails.reset();
  }

  createTask() {
    this.spinner.show();
    let formdata = new FormData();
    let formDetails = this.taskFormDetails.value;
    formdata.append("message", formDetails.message);
    formdata.append("due_date", `${formDetails.due_date} 12:12:12`);
    formdata.append("priority", formDetails.priority);
    formdata.append("assigned_to", formDetails.assigned_to);
    if (this.updateTask) {
      formdata.append("taskid", this.updateTask.id);
      this.taskService.updateTask(formdata).subscribe(
        (res) => {
          this.resetForm();
          this.spinner.hide();
          this.updateTask = null;
          this.pageTitle = "Create a new Task";
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.taskService.createTask(formdata).subscribe(
        (res) => {
          this.resetForm();
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
