import { Injectable } from '@angular/core';
import { Pessoa } from '../models/atletaModel';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  private atletas : Pessoa[] = []

  adicionar (pessoa: Pessoa){
    //armengue para gerar o id
    pessoa.id = this.atletas.length + 1

    this.atletas.push(pessoa)
  }

  listar(){
    console.table(this.atletas)
    return this.atletas
  }

  private localizarAtleta(idAtleta: number){
    return this.atletas.findIndex(elem => elem.id === idAtleta)
  }

  remover(posicaoArray : number){
    //exclui no próprio array (splice)
    this.atletas.splice(1,posicaoArray)
  }

  remover2(pessoa : Pessoa){
    //cria um novo array sem o item determinado(filter)
    this.atletas = this.atletas.filter(elem => elem.id !== pessoa.id)
  }

  alterar(pessoa : Pessoa){
    let posArray = this.localizarAtleta(pessoa.id)

    if(posArray >=0){
      this.atletas[posArray] = pessoa
    }
  }
}
