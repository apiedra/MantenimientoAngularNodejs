import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Constants} from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {


  constructor(private http: HttpClient) { }

  getOrder(idOrder) {
    const token=localStorage.getItem("token"); 
    return this
           .http
           .get(Constants.API_ENDPOINT+'/api/order/'+idOrder,{headers: new HttpHeaders().set('Authorization', token)});
  }

  getOrders() {
    const token=localStorage.getItem("token"); 
    return this
           .http
           .get(Constants.API_ENDPOINT+'/api/orders',{headers: new HttpHeaders().set('Authorization', token)});
  }

  getDetailOrder(idOrder) {
    const token=localStorage.getItem("token"); 
    return this
           .http
           .get(Constants.API_ENDPOINT+'/api/orderDetail/'+idOrder,{headers: new HttpHeaders().set('Authorization', token)});
  }

  addOrder(idNumber,description) {
    
    const obj = {
      idNumber: idNumber,
      description:description
    };
    const token=localStorage.getItem("token"); 
    return this.http.post(Constants.API_ENDPOINT+'/api/order',obj,{headers: new HttpHeaders().set('Authorization', token)});
  }
  deleteOrder(idOrder) {
    const token=localStorage.getItem("token"); 
    const obj = {
      idOrder:idOrder
    }; 
    return this
           .http
           .delete(Constants.API_ENDPOINT+'/api/order/'+idOrder,{headers: new HttpHeaders().set('Authorization', token)})
           .subscribe();
  }
  updateOrder(idOrder,idNumber,description) {
    
    const obj = {
      idOrder: idOrder,
      idNumber:idNumber,
      description:description
    };
    const token=localStorage.getItem("token"); 
    this.http.put(Constants.API_ENDPOINT+'/api/order',obj,{headers: new HttpHeaders().set('Authorization', token)})
    .subscribe();
  }
}
