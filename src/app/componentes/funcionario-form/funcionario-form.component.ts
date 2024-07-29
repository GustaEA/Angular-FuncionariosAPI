import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/Models/Funcionarios';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input() dadosFuncionario: Funcionario | null = null;

  funcionarioForm!: FormGroup;
  constructor(){}
  ngOnInit(): void {
    this.funcionarioForm = new FormGroup({
      id: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.id : 0),
      name: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.name : '', [Validators.required]),
      lastName: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.lastName : '', [Validators.required]),
      department: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.department : '', [Validators.required]),
      active: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.active : true),
      turn: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.turn : '', [Validators.required]),
      creationDate: new FormControl(new Date()),
      changeDate: new FormControl(new Date())
    })
  }

  submit(){
    this.onSubmit.emit(this.funcionarioForm.value);
    console.log(this.funcionarioForm.value);
  }
}
