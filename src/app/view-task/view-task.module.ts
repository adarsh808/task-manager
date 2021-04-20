import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewTaskComponent } from './view-task.component';
import { ViewTaskRoutingModule } from './view-task.routing.module';

@NgModule({
  declarations: [ViewTaskComponent],
  imports: [CommonModule, ViewTaskRoutingModule],
})
export class ViewTaskModule {}
