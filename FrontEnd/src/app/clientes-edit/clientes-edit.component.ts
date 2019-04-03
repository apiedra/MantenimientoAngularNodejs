import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import Cliente from '../model/Cliente';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.css']
})
export class ClientesEditComponent implements OnInit {
  cliente: Cliente;
  angForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,private fb: FormBuilder, private bs: ClienteService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      idNumber: new FormControl({value: '', disabled: true}, Validators.required),
      name: new FormControl({value: '', disabled: false}, Validators.required),
      surname: new FormControl({value: '', disabled: false}, Validators.required),
      secondSurname: new FormControl({value: '', disabled: false}, Validators.required)
    });
  }
  updateCliente( name, surname,secondSurname,idNumber) {
    this.bs.updateClient(name, surname, secondSurname,idNumber);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bs
      .getClient(params['idNumber'])
      .subscribe((data: Cliente) => {
        this.cliente = data[0];
        console.log(this.cliente.idNumber);
        this.angForm.setValue({idNumber: data[0].idNumber,
          name:data[0].name,
          surname:data[0].surname,
          secondSurname:data[0].secondSurname});
    });
    });
  }

}
