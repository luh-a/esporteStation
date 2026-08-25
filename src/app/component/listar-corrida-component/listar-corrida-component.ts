import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CorridaService } from '../../services/corrida-service';
import { Corrida } from '../../models/corridaModel';


@Component({
  imports: [ CommonModule ],
  selector: 'app-listar-corrida-component',
  styleUrl: './listar-corrida-component.css',
  templateUrl: './listar-corrida-component.html',
})
export class ListarCorridaComponent implements OnInit {
  //signal = manda um sinal atualizando a lista de corridas
  corridas = signal<Corrida[]>([]);

  // imports -> variáveis
  constructor(
    private corridaService: CorridaService,
    private router: Router,
  ){}

  ngOnInit() {
    this.atualizarCorridas();
  }

  editarCorrida(idCorrida: number) {
    this.router.navigate(['/cadastroCorrida', idCorrida]);
  }

  apagarCorrida(idCorrida: number) {
    //pega a função remover do service
    this.corridaService.remover(idCorrida).subscribe(() => {
      this.atualizarCorridas();
    });
  }

  private atualizarCorridas() {
    this.corridaService.listar().subscribe((informacoes) => {
      this.corridas.set(informacoes);
    });
  }

}
