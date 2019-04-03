import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {Constants} from './utils/constants';
import User from './model/User';
import Token from './model/Token';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  user:User;
  token:Token=null;
  constructor(private http: HttpClient) { 
  }
  getClientes() {
    const token=localStorage.getItem("token");    
    return this
           .http
           .get(Constants.API_ENDPOINT+'/api/client',{headers: new HttpHeaders().set('Authorization', token)});
  }
  getClient(idNumber) {
    const token=localStorage.getItem("token");    
    return this
           .http
           .get(Constants.API_ENDPOINT+'/api/client/'+idNumber,{headers: new HttpHeaders().set('Authorization', token)});
  }
  addCliente(name, surname,secondSurname,idNumber) {
    const obj = {
      name: name,
      surname: surname,
      secondSurname: secondSurname,
      idNumber: idNumber
    };
    const token=localStorage.getItem("token"); 
    return this.http.post(Constants.API_ENDPOINT+'/api/client', obj,{headers: new HttpHeaders().set('Authorization', token)});
  }
  deleteClientes(idNumber) { 
    const token=localStorage.getItem("token"); 
    return this.http.delete(Constants.API_ENDPOINT+'/api/client/'+idNumber,{headers: new HttpHeaders().set('Authorization', token)});
  }
  updateClient(name, surname,secondSurname,idNumber) {
    const obj = {
      name: name,
      surname: surname,
      secondSurname: secondSurname,
      idNumber: idNumber
    };
    const token=localStorage.getItem("token"); 
    this.http.put(Constants.API_ENDPOINT+'/api/client/'+idNumber, obj,{headers: new HttpHeaders().set('Authorization', token)})
    .subscribe();
  }
}
