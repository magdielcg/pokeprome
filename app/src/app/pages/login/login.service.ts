import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Login } from './login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AppService implements Login {

  protected override uri: string = 'login';

  public birthday: Date;
  public document: string;

  constructor(protected override http: HttpClient) { 
    super();
    this.birthday = new Date;
    this.document = "";
  }
}
