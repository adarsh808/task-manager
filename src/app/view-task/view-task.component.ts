import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  task: any;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private spinner:NgxSpinnerService
  ) { 
    this.spinner.show();
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.taskService.listTasks().subscribe((res) => {
        this.task = res.tasks.find((task) => task.id == param.taskid);
        this.spinner.hide()
      }, (error) => {
          console.log(error)
      })
    })
  }

}
