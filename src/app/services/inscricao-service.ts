import { Injectable } from '@angular/core';
import { inscricao } from '../models/inscricaoModel';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscricaoService {

  //array de inscrições, carregado do localStorage
  private inscricoes: inscricao[] = JSON.parse(localStorage.getItem('inscricoesEsporteStation') || '[]');

  //salva o array atual no localStorage
  private salvar(){
    localStorage.setItem('inscricoesEsporteStation', JSON.stringify(this.inscricoes));
  }

  //adiciona uma nova inscrição
  //devolve Observable<inscricao>
  adicionar(inscricaoObj: inscricao): Observable<inscricao> {
    inscricaoObj.idInscricao = Date.now();
    this.inscricoes.push(inscricaoObj);
    this.salvar();

    return of(inscricaoObj);
  }

  //lista todas as inscrições
  listar(): Observable<inscricao[]> {
    return of(this.inscricoes);
  }

  //remove uma inscrição pelo id
  remover(idInscricao: number): Observable<void> {
    this.inscricoes = this.inscricoes.filter(item => item.idInscricao !== idInscricao);
    this.salvar();

    return of(undefined);
  }
}