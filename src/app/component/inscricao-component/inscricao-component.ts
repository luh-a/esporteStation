import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AtletaService } from '../../services/atleta-service';
import { CorridaService } from '../../services/corrida-service';
import { InscricaoService } from '../../services/inscricao-service';
import { Pessoa } from '../../models/atletaModel';
import { Corrida } from '../../models/corridaModel';
import { inscricao } from '../../models/inscricaoModel';

@Component({
  selector: 'app-inscricao-component',
  imports: [FormsModule],
  templateUrl: './inscricao-component.html',
  styleUrl: './inscricao-component.css',
})
export class InscricaoComponent implements OnInit {
  atletas = signal<Pessoa[]>([]);
  corridas = signal<Corrida[]>([]);

  idAtleta: number | null = null;
  idCorrida: number | null = null;
  camisaTam = '';

  constructor(
    private atletaService: AtletaService,
    private corridaService: CorridaService,
    private inscricaoService: InscricaoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.atletaService.ApiList().subscribe((lista) => this.atletas.set(lista));
    this.corridaService.listar().subscribe((lista) => this.corridas.set(lista));
  }

  salvarInscricao(){
    if (this.idAtleta === null || this.idCorrida === null) {
      return;
    }

    const novaInscricao = new inscricao();
    novaInscricao.idAtleta = this.idAtleta;
    novaInscricao.idCorrida = this.idCorrida;
    novaInscricao.camisaTam = this.camisaTam;

    this.inscricaoService.adicionar(novaInscricao).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}