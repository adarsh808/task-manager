import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-task-list-view",
  templateUrl: "./task-list-view.component.html",
  styleUrls: ["./task-list-view.component.scss"],
})
export class TaskListViewComponent implements OnInit {
  @Output()
  openDeleteModal: EventEmitter<any> = new EventEmitter();
  @Input()
  taskList: Array<any>;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.taskList && changes.taskList.currentValue) {
      this.taskList.sort(function (a, b) {
        if (a.due_date === null) {
          return 1;
        } else if (b.due_date === null) {
          return -1;
        }
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      });
    }
  }

  openModal(task) {
    this.openDeleteModal.emit(task);
  }
}
