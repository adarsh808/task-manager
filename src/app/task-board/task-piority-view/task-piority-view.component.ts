import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-task-piority-view",
  templateUrl: "./task-piority-view.component.html",
  styleUrls: ["./task-piority-view.component.scss"],
})
export class TaskPiorityViewComponent implements OnInit {
  @Output()
  openDeleteModal: EventEmitter<any> = new EventEmitter();
  @Input()
  taskList: Array<any>;
  draggedTask: any;
  constructor(private taskService: TaskService) {}

  ngOnInit() {}
  openModal(task) {
    this.openDeleteModal.emit(task);
  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  drop(ev) {
    let parent = ev.target.closest(".priority-column");
    let targetPriority = parent.getAttribute("data-priority");
    this.taskList = this.taskList.map((task) => {
      if (this.draggedTask.id == task.id) {
        task.priority = targetPriority;
      }
      return task;
    })
    let formData = new FormData();
    for (let i in this.draggedTask) {
      formData.append(i, this.draggedTask[i]);
    }
    formData.append("priority", targetPriority);
    formData.append("taskid", this.draggedTask.id);
    this.taskService.updateTask(formData).subscribe(
      (res) => {
      },
      (err) => {
        console.log(err);
      }
    );
  }
  drag(ev, task) {
    this.draggedTask = task;
  }
}
