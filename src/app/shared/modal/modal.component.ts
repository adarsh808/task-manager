import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  dialog: string;
  @Input()
  buttonText: string;
  @Output()
  confirmFun: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  openModal() {
    $("#commonModal").modal("show");
  }
  closeModal() {
    $("#commonModal").modal("hide");

  }
  confirmAction() {
    this.confirmFun.emit();
  }
}
