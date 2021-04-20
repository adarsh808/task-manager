import { Component, OnInit, ViewChild } from "@angular/core";
import { TaskService } from "../services/task.service";
import { ModalComponent } from "../shared/modal/modal.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-task-board",
  templateUrl: "./task-board.component.html",
  styleUrls: ["./task-board.component.scss"],
})
export class TaskBoardComponent implements OnInit {
  tasks: Array<any>;
  filteredTask: Array<any>;
  taskToDelete: any;
  modalDialog: string;
  buttonText: string = "Delete";
  sortOptions = ["Due Date", "Priority"];
  sortBy: string = "Due Date";
  @ViewChild("modal", {
    static: false,
  })
  modal: ModalComponent;

  constructor(
    private taskService: TaskService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
  }

  ngOnInit() {
    this.taskService.listTasks().subscribe(
      (taskList) => {
        this.tasks = taskList.tasks;
        this.filteredTask = this.tasks;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openModal(task) {
    this.modalDialog = `Are you sure to delete Task#${task.id}`;
    this.taskToDelete = task;
    this.modal.openModal();
  }
  deleteTask() {
    this.spinner.show();
    let formData = new FormData();
    formData.append("taskid", this.taskToDelete.id);
    this.taskService.deleteTask(formData).subscribe(
      (res) => {
        this.tasks = this.tasks.filter(
          (task) => task.id !== this.taskToDelete.id
        );
        this.filteredTask = this.filteredTask.filter(
          (task) => task.id !== this.taskToDelete.id
        );
        this.spinner.hide();
        this.modal.closeModal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewChange(e) {
    this.sortBy = e.target.value;
  }
  searchList(searchTerm) {
    this.filteredTask = this.tasks.filter((task) => {

     return task.id.includes(searchTerm) ||
        (task.assigned_name &&
          task.assigned_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        task.message.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
