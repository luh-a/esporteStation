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
  distancia = '';
  modoEdicao = false;

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
      this.data = this.formatarData(corrida.data);
      this.distancia = corrida.distancia;
      //chama o signal
      this.cdr.detectChanges();
    });
  }

}

//declaração de funções
exibirDados(){
  console.log(this.descricao, this.data, this.distancia);
}

salvarCorrida(){
  const corrida = new Corrida()
  // ?? 0 = se não houver nada começa em 0
  corrida.idCorrida = this.idCorrida ?? 0
  corrida.descricao = this.descricao
  corrida.data = this.data ? new Date(`${this.data}T00:00:00`) : null
  corrida.distancia = this.distancia

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
    this.distancia = '';
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
