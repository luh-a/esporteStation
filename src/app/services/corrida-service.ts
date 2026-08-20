import { Injectable } from '@angular/core';
import { Corrida } from '../models/corridaModel';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  private corridas : Corrida[] = []

  adicionar (corrida : Corrida){
    //armengue para gerar o id by alisson
    corrida.id = this.corridas.length + 1

    this.corridas.push(corrida)
  }

  listar(){
    console.table(this.corridas)
    return this.corridas
  }

  private localizarCorrida(idCorrida: number){
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
  }
}
