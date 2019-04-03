import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import Cliente from '../model/Cliente';
import order from '../model/order';
@Component({
  selector: 'app-pedido-edit',
  templateUrl: './pedido-edit.component.html',
  styleUrls: ['./pedido-edit.component.css']
})
export class PedidoEditComponent implements OnInit {
  angForm: FormGroup;
  order: order;
  
  constructor(private route: ActivatedRoute,
    private router: Router,private fb: FormBuilder, private pedidoService: PedidoService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      idOrder: new FormControl({value: '', disabled: true}, Validators.required),
      description: new FormControl({value: '', disabled: false}, Validators.required),
      idNumber:new FormControl({value: '', disabled: true}, Validators.required)
    });
  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.pedidoService
      .getOrder(params['idOrder'])
      .subscribe((data: order) => {
        this.order = data[0];
        this.angForm.setValue({idNumber: data[0].idNumber,
          idOrder:data[0].idOrder,
          description:data[0].description});
    });
    });
  }
  updateOrder( id_order,idNumber, description) {
    this.pedidoService.updateOrder(id_order,idNumber, description);
  }

}
