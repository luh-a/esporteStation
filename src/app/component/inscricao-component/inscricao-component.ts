import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtletaService } from '../../services/atleta-service';
import { CorridaService } from '../../services/corrida-service';
import { InscricaoService } from '../../services/inscricao-service';
import { Pessoa } from '../../models/atletaModel';
import { Corrida } from '../../models/corridaModel';
import { inscricao } from '../../models/inscricaoModel';

//valor fixo cobrado em qualquer inscrição, independente da distância escolhida
const VALOR_INSCRICAO = 15.00;

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
  distanciaProva = '';
  categoria = '';
  aceiteTermos = false;

  //campo alternativo pra achar o atleta digitando o cpf, em vez de usar o select
  cpfBusca = '';

  constructor(
    private atletaService: AtletaService,
    private corridaService: CorridaService,
    private inscricaoService: InscricaoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.atletaService.ApiList().subscribe((lista) => this.atletas.set(lista));

    this.corridaService.listar().subscribe((lista) => {
      this.corridas.set(lista);

      //se veio um idCorrida na url (clicou em "Inscrever-se" na listagem), pré-seleciona
      const idCorridaParam = this.route.snapshot.queryParamMap.get('idCorrida');
      if (idCorridaParam) {
        this.idCorrida = Number(idCorridaParam);
      }
    });
  }

  //distâncias disponíveis para a corrida que está selecionada no momento
  distanciasDaCorrida(): string[] {
    const corrida = this.corridas().find(c => c.idCorrida === this.idCorrida);
    return corrida ? corrida.distancias : [];
  }

  //busca o atleta pelo cpf digitado e já seleciona ele no select
  buscarPorCpf(){
    const cpfLimpo = this.cpfBusca.replace(/\D/g, '');

    if (!cpfLimpo) {
      return;
    }

    const encontrado = this.atletas().find(a => a.cpf.replace(/\D/g, '') === cpfLimpo);

    if (encontrado) {
      this.idAtleta = encontrado.idPessoa;
    }
  }

  //valor fixo da inscrição, não depende mais da distância
  calcularValor(): number {
    return VALOR_INSCRICAO;
  }

  salvarInscricao(){
    if (this.idAtleta === null || this.idCorrida === null || !this.aceiteTermos) {
      return;
    }

    const novaInscricao = new inscricao();
    novaInscricao.idAtleta = this.idAtleta;
    novaInscricao.idCorrida = this.idCorrida;
    novaInscricao.camisaTam = this.camisaTam;
    novaInscricao.distanciaProva = this.distanciaProva;
    novaInscricao.categoria = this.categoria;
    novaInscricao.valor = this.calcularValor();
    novaInscricao.aceiteTermos = this.aceiteTermos;

    this.inscricaoService.adicionar(novaInscricao).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}