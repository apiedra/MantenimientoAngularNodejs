import { Component, OnInit } from '@angular/core';
import order from '../model/order';
import Token from '../model/Token';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-get',
  templateUrl: './pedido-get.component.html',
  styleUrls: ['./pedido-get.component.css']
})
export class PedidoGetComponent implements OnInit {
  token:Token;
  orders:order[];
  constructor(private pedidoServcie: PedidoService) { }

  ngOnInit() {
    this.pedidoServcie
      .getOrders()
      .subscribe((data: order[]) => {
        this.orders = data;
    });
  }
  deletePedido(idOrder) {
    this.pedidoServcie.deleteOrder(idOrder);
    this.pedidoServcie
      .getOrders()
      .subscribe((data: order[]) => {
        this.orders = data;
    });
  }
  detailPedido(idOrder) {
    this.pedidoServcie
      .getDetailOrder(idOrder)
      .subscribe((data: order[]) => {
        this.orders = data;
    });
  }

}
