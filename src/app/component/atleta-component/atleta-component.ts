import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../../services/atleta-service';
import { Pessoa } from '../../models/atletaModel';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})

export class AtletaComponent {
  //declaração dos atributos do componente
  nome = '';
  cpf = '';
  sexo = '';
  cep = '';
  ruaLogradouro = '';
  bairro = '';
  cidade = '';
  estado = '';
  uf = '';

  //declaração do construtor
  constructor(private atletaService: AtletaService){}

  //declaração de funções
  exibirDados() {
    console.log(this.nome, this.cpf, this.sexo, this.cep, this.ruaLogradouro, this.bairro, this.cidade, this.estado, this.uf);
  }

  salvarAtleta(){
  const pessoaAtleta = new Pessoa()
  pessoaAtleta.nome = this.nome
  pessoaAtleta.cpf = this.cpf
  pessoaAtleta.sexo = this.sexo
  pessoaAtleta.cep = this.cep
  pessoaAtleta.ruaLogradouro = this.ruaLogradouro
  pessoaAtleta.bairro = this.bairro
  pessoaAtleta.cidade = this.cidade
  pessoaAtleta.estado = this.estado
  pessoaAtleta.uf = this.uf

  this.atletaService.adicionar(pessoaAtleta).subscribe(() => {
    this.limparFormulario();
  });
}

limparFormulario(){
  this.nome = '';
  this.cpf = '';
  this.sexo = '';
  this.cep = '';
  this.ruaLogradouro = '';
  this.bairro = '';
  this.cidade = '';
  this.estado = '';
  this.uf = '';
}

}
