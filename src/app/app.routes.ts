import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AtletaComponent } from './component/atleta-component/atleta-component';
import { CorridaComponent } from './component/corrida-component/corrida-component';
import { ListarCorridaComponent } from './component/listar-corrida-component/listar-corrida-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cadastroAtleta',
    component: AtletaComponent
  },
  {
    path: 'cadastroCorrida',
    component: CorridaComponent
  },
  {
    path: 'listarCorrida',
    component: ListarCorridaComponent
  }
];
