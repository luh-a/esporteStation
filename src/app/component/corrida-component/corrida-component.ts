import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CorridaService } from '../../services/corrida-service';
import { Corrida } from '../../models/corridaModel'

@Component({
  selector: 'app-corrida-component',
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})

export class CorridaComponent {
  //declaração dos atributos do componente
  descricao = '';
  data = '';
  distancia = '';

//declaração do construtor
constructor(private corridaService: CorridaService){}

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
