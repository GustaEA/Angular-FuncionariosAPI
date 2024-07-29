import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/componentes/excluir/excluir.component';

import { Funcionario } from 'src/app/Models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionarioGeral: Funcionario[] = [];

  colunas = ['Situacao', 'Nome', 'Sobrenome','Departamento', 'Acoes', 'Excluir']

  constructor(private funcionarioService: FuncionarioService, public dialog: MatDialog){}
  ngOnInit(): void {
    this.funcionarioService.GetFuncionario().subscribe(data => {const dados = data.data;
      dados.map((item) => {
        item.creationDate = new Date(item.creationDate!).toLocaleDateString('pt-BR')
        item.changeDate = new Date(item.changeDate!).toLocaleDateString('pt-BR')
      })
      this.funcionarios = data.data;
      this.funcionarioGeral = data.data;
    });
  }

  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.funcionarios = this.funcionarioGeral.filter(funcionario => {
      return funcionario.name.toLowerCase().includes(value);
    })
  }

  openDialog(id: number){
    this.dialog.open(ExcluirComponent, {
      width: '350px',
      height: '350px',
      data: {
        id: id
      }
    });
  }
}
