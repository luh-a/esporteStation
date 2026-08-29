import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  constructor(
    private atletaService: AtletaService,
    private http: HttpClient,
  ){}

  //busca o endereço automaticamente a partir do cep digitado, usando a api pública do ViaCEP
  buscarCep(){
    const cepLimpo = this.cep.replace(/\D/g, '');

    //só busca quando o cep tiver os 8 dígitos completos
    if (cepLimpo.length !== 8) {
      return;
    }

    this.http.get<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe((endereco) => {
      if (!endereco.erro) {
        this.ruaLogradouro = endereco.logradouro;
        this.bairro = endereco.bairro;
        this.cidade = endereco.localidade;
        this.uf = endereco.uf;
        this.estado = endereco.uf; //o viacep não devolve o nome completo do estado, só a sigla
      }
    });
  }

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