import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "create-task",
    loadChildren: () =>
      import("./create-task/create-task.module").then(
        (m) => m.CreateTaskModule
      ),
  },
  {
    path: "task-list",
    loadChildren: () =>
      import("./task-board/task-board.module").then((m) => m.TaskBoardModule),
  },
  {
    path: "view-task/:taskid",
    loadChildren: () =>
      import("./view-task/view-task.module").then((m) => m.ViewTaskModule),
  },
  { path: '', redirectTo: "/create-task",pathMatch:"full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
