import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/Models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  btnAcao = "Editar";
  btnTitulo = "Editar Funcionario.";
  funcionario!: Funcionario;

  constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionarioService.GetFuncionarioById(id).subscribe((data) =>{
      this.funcionario = data.data;
      
    });
  }

  editFuncionario(funcionario: Funcionario){
    this.funcionarioService.EditFuncionario(funcionario).subscribe((data) =>{
      this.router.navigate(['/'])
    });
  }
}
