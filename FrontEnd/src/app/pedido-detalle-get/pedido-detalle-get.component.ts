import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import detail from '../model/detail';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedido-detalle-get',
  templateUrl: './pedido-detalle-get.component.html',
  styleUrls: ['./pedido-detalle-get.component.css']
})
export class PedidoDetalleGetComponent implements OnInit {
  detail: detail;
  angForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router, private pedidoServcie: PedidoService,
    private fb: FormBuilder) { this.createForm(); }
  createForm() {
    this.angForm = this.fb.group({
      idNumber: new FormControl({value: '', disabled: true}, Validators.required),
      idOrder: new FormControl({value: '', disabled: true}, Validators.required),
      name: new FormControl({value: '', disabled: true}, Validators.required),
      surname: new FormControl({value: '', disabled: true}, Validators.required),
      secondSurname: new FormControl({value: '', disabled: true}, Validators.required),
      description: new FormControl({value: '', disabled: true}, Validators.required)
    });
  }
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.pedidoServcie.getDetailOrder(params['idOrder']).
      subscribe((data: detail) => {
        this.detail = data[0];
        this.angForm.setValue({idNumber: data[0].idNumber,
          idOrder:data[0].idOrder,
          name:data[0].name,
          surname:data[0].surname,
          secondSurname:data[0].secondSurname,
          description:data[0].description});
      });
    });
  }

}
