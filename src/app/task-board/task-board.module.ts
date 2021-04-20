import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskBoardComponent } from './task-board.component';
import { TaskBoardRoutingModule } from './task-board.routing.module';
import { SharedModule } from '../shared/shared.module';
import { TaskListViewComponent } from './task-list-view/task-list-view.component';
import { TaskPiorityViewComponent } from './task-piority-view/task-piority-view.component';

@NgModule({
  declarations: [
    TaskBoardComponent,
    TaskListViewComponent,
    TaskPiorityViewComponent,
  ],
  imports: [
    CommonModule,
    TaskBoardRoutingModule,
        SharedModule,
    ],
})
export class TaskBoardModule {}
