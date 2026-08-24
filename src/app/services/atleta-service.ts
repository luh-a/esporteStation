import { Injectable } from '@angular/core';
import { Pessoa } from '../models/atletaModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  constructor (private http: HttpClient){ }

  adicionar (pessoa: Pessoa): Observable<Pessoa> {
    const apiUrl = `https://6a88d25f7b483fa21fe93e0c.mockapi.io/Atleta`
    return this.http.post<Pessoa>(apiUrl, pessoa)
  }

  ApiList(): Observable<Pessoa[]> {
    const apiUrl = `https://6a88d25f7b483fa21fe93e0c.mockapi.io/Atleta`
    return this.http.get<Pessoa[]>(apiUrl)
  }

  listar(idPessoa: number): Observable<Pessoa> {
    const apiUrl = `https://6a88d25f7b483fa21fe93e0c.mockapi.io/Atleta/${idPessoa}`
    return this.http.get<Pessoa>(apiUrl)
  }

  alterar(pessoa : Pessoa): Observable<Pessoa> {
    const apiUrl = `https://6a88d25f7b483fa21fe93e0c.mockapi.io/Atleta/${pessoa.idPessoa}`
    return this.http.put<Pessoa>(apiUrl, pessoa)
  }

  remover(pessoa : Pessoa): Observable<Pessoa>{
    const apiUrl = `https://6a88d25f7b483fa21fe93e0c.mockapi.io/Atleta/${pessoa.idPessoa}`
    return this.http.delete<Pessoa>(apiUrl)
  }

  /*remover2(pessoa : Pessoa){
    //cria um novo array sem o item determinado(filter)
    this.atletas = this.atletas.filter(elem => elem. !== pessoa.id)
  }

  alterar(pessoa : Pessoa){
    let posArray = this.localizarAtleta(pessoa.id)

    if(posArray >=0){
      this.atletas[posArray] = pessoa
    }
  }*/
}
