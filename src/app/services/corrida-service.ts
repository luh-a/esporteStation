import { Injectable } from '@angular/core';
import { Corrida } from '../models/corridaModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  //vinculação da api criada
  private apiUrl = 'https://6a88d25f7b483fa21fe93e0c.mockapi.io/Corrida';

  //determinando o http (protocolo de upload da api)
  constructor(private http: HttpClient) {}

  // Observable<Corrida> : o que for adicionado deve seguir o modelo <xxx>
  adicionar (corrida : Corrida): Observable<Corrida> {
    //post: enviar e salvar os dados da corrida para a api
    return this.http.post<Corrida>(this.apiUrl, corrida);
  }

  //verificação do conjunto([]) em vez de elemento por elemento
  listar():Observable<Corrida[]>{
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(lista => lista.map(item => ({...item, idCorrida: Number(item.id)})))
      )
    };

  localizarCorrida(idCorrida: number): Observable<Corrida> {
    return this.http.get<Corrida>(`${this.apiUrl}/${idCorrida}`).pipe(
      map(item => ({...item, idCorrida: Number(item.idCorrida)}))
    );
  }

  remover(idCorrida: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCorrida}`);
  }

  alterar(idCorrida: number, corrida: Corrida): Observable<Corrida> {
    return this.http.put<Corrida>(`${this.apiUrl}/${idCorrida}`, corrida);
  }
}

  /* private localizarCorrida(idCorrida: number){
    return this.corridas.findIndex(elem => elem.id === idCorrida)
  }

  remover(posicaoArray : number){
    //exclui no próprio array (splice)
    this.corridas.splice(1,posicaoArray)
  }

  remover2(corrida : Corrida){
    //cria um novo array sem o item determinado(filter)
    this.corridas = this.corridas.filter(elem => elem.id !== corrida.id)
  }

  alterar(corrida : Corrida){
    let posArray = this.localizarCorrida(corrida.id)

    if(posArray >=0){
      this.corridas[posArray] = corrida
    }
  }*/
