import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskCardComponent } from './task-card/task-card.component';
import { ModalComponent } from './modal/modal.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TaskCardComponent, ModalComponent, SearchInputComponent],
  imports: [CommonModule,FormsModule,RouterModule],
  exports: [TaskCardComponent, ModalComponent, SearchInputComponent]
})
export class SharedModule {}
