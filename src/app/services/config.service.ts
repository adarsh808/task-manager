import { Injectable, APP_INITIALIZER } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResolveEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class ConfigService {
  settings = new BehaviorSubject(null);
    constructor(private http:HttpClient) {
      
  }

    getSettings() {
      this.http.get("config/config.json").subscribe(settings => {
            this.settings.next(settings);
        });
    }
    
}
export function ConfigFactory(config: ConfigService) {
  return () => config.getSettings();
}

export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: ConfigFactory,
    deps: [ConfigService],
    multi: true,
  };
}

const ConfigModule = {
  init: init,
};

export { ConfigModule };