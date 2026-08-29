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
  data = '';
  modoEdicao = false;

  //um boolean pra cada distância, permitindo marcar mais de uma (checkbox)
  dist5 = false;
  dist10 = false;
  dist25 = false;

//declaração do construtor
constructor(
  private http: CorridaService,
  private route:ActivatedRoute,
  private router:Router,
  private cdr:ChangeDetectorRef,
  ){}

ngOnInit(): void {
  const idCorridaParam = this.route.snapshot.paramMap.get('idCorrida');
  if (idCorridaParam) {
    const idCorrida = Number(idCorridaParam);
    this.modoEdicao = true;

    this.http.localizarCorrida(idCorrida).subscribe((corrida) => {
      this.idCorrida = corrida.idCorrida;
      this.descricao = corrida.descricao;
      this.data = corrida.data ? new Date(corrida.data).toISOString().split('T')[0] : '';

      //marca os checkboxes conforme as distâncias já cadastradas nessa corrida
      this.dist5 = corrida.distancias.includes('5');
      this.dist10 = corrida.distancias.includes('10');
      this.dist25 = corrida.distancias.includes('25');

      //chama o signal
      this.cdr.detectChanges();
    });
  }

}

//declaração de funções
exibirDados(){
  console.log(this.descricao, this.data, this.dist5, this.dist10, this.dist25);
}

salvarCorrida(){
  const corrida = new Corrida()
  // ?? 0 = se não houver nada começa em 0
  corrida.idCorrida = this.idCorrida ?? 0
  corrida.descricao = this.descricao
  corrida.data = this.data ? new Date(`${this.data}T00:00:00`) : null

  //monta o array de distâncias a partir dos checkboxes marcados
  corrida.distancias = [];
  if (this.dist5) corrida.distancias.push('5');
  if (this.dist10) corrida.distancias.push('10');
  if (this.dist25) corrida.distancias.push('25');

  const operacao = this.modoEdicao
  ? this.http.alterar(corrida.idCorrida, corrida)
  :this.http.adicionar(corrida)

  operacao.subscribe(() => {
    if (this.modoEdicao) {
      this.router.navigate(['/listarCorrida']);
    } else {
      this.limparFormulario();
    }
  console.log(corrida)
  });
}

cancelarEdicao() {
  this.router.navigate(['/listarCorrida']);
}

limparFormulario() {
    this.descricao = '';
    this.data = '';
    this.dist5 = false;
    this.dist10 = false;
    this.dist25 = false;
    this.idCorrida = null;
    this.modoEdicao = false;
}

private formatarData(data: Date | string | null): string {
  if (!data) {
    return '';
  }

  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
  }

}