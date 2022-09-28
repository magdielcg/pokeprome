import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AppService implements User {

  protected override uri: string = 'user';

  id: string;
  name: string;
  hobby?: number;
  birthday: Date;
  document: string;
  status?: boolean;

  constructor(protected override http: HttpClient) { 
    super();
    this.id = "";
    this.name = "";
    this.hobby = 0;
    this.birthday = new Date;
    this.document = "";
  }
}
