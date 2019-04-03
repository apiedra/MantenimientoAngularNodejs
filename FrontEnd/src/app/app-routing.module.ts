import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesAddComponent } from './clientes-add/clientes-add.component';
import { ClientesEditComponent } from './clientes-edit/clientes-edit.component';
import { ClientesGetComponent } from './clientes-get/clientes-get.component';
import { PedidoAddComponent } from './pedido-add/pedido-add.component';
import { PedidoEditComponent } from './pedido-edit/pedido-edit.component';
import { PedidoGetComponent } from './pedido-get/pedido-get.component';
import { PedidoDetalleGetComponent } from './pedido-detalle-get/pedido-detalle-get.component';


const routes: Routes = [
  {
    path: 'cliente/create',
    component: ClientesAddComponent
  },
  {
    path: 'cliente/:idNumber',
    component: ClientesEditComponent
  },
  {
    path: 'clientes',
    component: ClientesGetComponent
  },
  {
    path: 'pedido/create',
    component: PedidoAddComponent
  },
  {
    path: 'pedidos',
    component: PedidoGetComponent
  },
  {
    path: 'pedido/:idOrder',
    component: PedidoEditComponent
  },
  {
    path: 'detail/:idOrder/:idNumber',
    component: PedidoDetalleGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
