import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CorridaService } from '../../services/corrida-service';
import { Corrida } from '../../models/corridaModel'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-corrida-component',
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})

export class CorridaComponent implements OnInit {
  //declaração dos atributos do componente
  idCorrida: number | null = null;
  descricao = '';
  data = null;
  distancia = '';

//declaração do construtor
constructor(
  private corridaService: CorridaService,
  private route:ActivatedRoute,
  private router:Router,
  private cdr:ChangeDetectorRef,
  ){}

ngOnInit(): void {

}

//declaração de funções
exibirDados(){
  console.log(this.descricao, this.data, this.distancia);
}

salvarCorrida(){
  const corrida = new Corrida()
  corrida.descricao = this.descricao
  corrida.data = this.data
  corrida.distancia = this.distancia
}

}
