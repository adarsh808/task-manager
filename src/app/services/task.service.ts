import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from './config.service';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class TaskService {
  config;
  taskToUpdate = new BehaviorSubject(null);

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.configService.settings.subscribe((config) => {
      this.config = config;
    });
  }
  setTask(task) {
    this.taskToUpdate.next(task);
  }
  getTask(): Observable<any> {
    return this.taskToUpdate.asObservable();
  }

  createTask(task): Observable<any> {
    return this.http.post(this.config.apiBaseURL + "/create", task);
  }

  updateTask(task): Observable<any> {
    return this.http.post(this.config.apiBaseURL + "/update", task);
  }

  deleteTask(taskId): Observable<any> {
    return this.http.post(this.config.apiBaseURL + "/delete", taskId);
  }

  listUsers(): Observable<any> {
    return this.http.get(this.config.apiBaseURL + "/listusers");
  }

  listTasks(): Observable<any> {
    return this.http.get(this.config.apiBaseURL + "/list");
  }
}
    
