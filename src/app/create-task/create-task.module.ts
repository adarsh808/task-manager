import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateTaskComponent } from "./create-task.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateTaskRoutingModule } from "./create-task.routing.module";

@NgModule({
  declarations: [CreateTaskComponent],
  imports: [CommonModule, ReactiveFormsModule, CreateTaskRoutingModule],
})
export class CreateTaskModule {}
