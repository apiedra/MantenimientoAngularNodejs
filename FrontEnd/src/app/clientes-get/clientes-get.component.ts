import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import Cliente from '../model/Cliente';
import Token from '../model/Token';

@Component({
  selector: 'app-clientes-get',
  templateUrl: './clientes-get.component.html',
  styleUrls: ['./clientes-get.component.css']
})
export class ClientesGetComponent implements OnInit {
  clientes: Cliente[];
  token:Token;
  showMsg: boolean = false;
  showErrorMsg: boolean = false;

  constructor(private bs: ClienteService) { }

  ngOnInit() {
    this.bs
      .getClientes()
      .subscribe((data: Cliente[]) => {
        this.clientes = data;
    });
  }
  deleteCliente(numero_identificacion) {
    this.bs.deleteClientes(numero_identificacion).subscribe((data: Cliente[]) => {
      this.clientes = data;
      this.showSuccess();
  },
  error => {
    this.showError(); 
  });
    this.bs
      .getClientes()
      .subscribe((data: Cliente[]) => {
        this.clientes = data;
    });
  }
  showSuccess() {
    this.showMsg= true;
}
showError() {
  this.showErrorMsg= true;
}
clear() {
  this.showMsg= false;
  this.showErrorMsg= false;
}
}
