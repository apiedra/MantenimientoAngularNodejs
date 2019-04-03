import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.css']
})
export class ClientesAddComponent implements OnInit {
  angForm: FormGroup;
  selectedProfesion: string;
  showMsg: boolean = false;
  showErrorMsg: boolean = false;

  constructor(private fb: FormBuilder, private bs: ClienteService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      idNumber: ['', Validators.required ],
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      secondSurname: ['', Validators.required ]
    });
  }
  addCliente( name, surname,secondSurname,idNumber) {
    this.bs.addCliente(name, surname, secondSurname,idNumber).subscribe(
      (data: any) => {
        console.log(data);
        this.showSuccess();
      },
      error => {
        console.log(error);
        this.showErrorSuccess(); 
      });
    
  }
  ngOnInit() {
  }
  showSuccess() {
    this.showMsg= true;
}
showErrorSuccess() {
  this.showErrorMsg= true;
}
clear() {
  this.showMsg= false;
}
}
