import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {Constants} from './utils/constants';
import Token from './model/Token';
import User from './model/User';


@Injectable({
  providedIn: 'root'
})
export class AutenticateService {

  token:Token;
  user:User;
  constructor(private http: HttpClient ) { }
  autenticate() {
    this.user={
      username:Constants.USER,
      password:Constants.PASSWORD
    };
    return this
           .http
           .post(Constants.API_ENDPOINT+'/security/authenticate',this.user)
           .subscribe((data: Token) => {
            this.token=data;
            localStorage.setItem('token', this.token.token);
          });

  }

  
}
