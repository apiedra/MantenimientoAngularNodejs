import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { ClientesAddComponent } from './clientes-add/clientes-add.component';
import { ClientesGetComponent } from './clientes-get/clientes-get.component';
import { ClientesEditComponent } from './clientes-edit/clientes-edit.component';
import { ClienteService } from './cliente.service';
import { AutenticateService } from './autenticate.service';
import { PedidoAddComponent } from './pedido-add/pedido-add.component';
import { PedidoGetComponent } from './pedido-get/pedido-get.component';
import { PedidoEditComponent } from './pedido-edit/pedido-edit.component';
import { PedidoDetalleGetComponent } from './pedido-detalle-get/pedido-detalle-get.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesAddComponent,
    ClientesGetComponent,
    ClientesEditComponent,
    PedidoAddComponent,
    PedidoGetComponent,
    PedidoEditComponent,
    PedidoDetalleGetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    LocalStorageModule.forRoot({
      prefix: 'pfcti',
      storageType: 'localStorage'
  })
  ],
  providers: [ClienteService,AutenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
