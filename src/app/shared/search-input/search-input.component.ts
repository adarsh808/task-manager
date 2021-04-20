import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent implements OnInit {
  userEntry: string;
  @Input()
  listToSearch: Array<any>;
  @Output()
  searchAction: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  searchList(e) {
    this.searchAction.emit(e);
  }
}
