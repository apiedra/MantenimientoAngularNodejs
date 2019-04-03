import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { PedidoService } from '../pedido.service';
import Cliente from '../model/Cliente';

@Component({
  selector: 'app-pedido-add',
  templateUrl: './pedido-add.component.html',
  styleUrls: ['./pedido-add.component.css']
})
export class PedidoAddComponent implements OnInit {
  clients: Cliente[];
  idNumber: string;
  angForm: FormGroup;
  showMsg: boolean = false;
  showErrorMsg: boolean = false;
  constructor(private fb: FormBuilder, private bs: ClienteService,private pedidoService: PedidoService) {
  this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      description: ['', Validators.required ]
    });
  }
  addPedido(description) {
    this.pedidoService.addOrder(this.idNumber,description).subscribe((data: Cliente[]) => {
      this.clients = data;
      this.showSuccess();
  },
  error => {
    console.log(error);
    this.showError(); 
  });;
  }
  ngOnInit() {
    this.bs
      .getClientes()
      .subscribe((data: Cliente[]) => {
        this.clients = data;
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
  this.showErrorMsg= true;
}
}
