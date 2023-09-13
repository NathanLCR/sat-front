import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ListarContatoComponent } from './contato/listar-contato/listar-contato.component';
import { CadastrarContatoComponent } from './contato/cadastrar-contato/cadastrar-contato.component';
const routes: Routes = [
  {
    path: 'cadastrar-contato/:id',
    component: CadastrarContatoComponent,
  },
  {
    path: 'cadastrar-contato',
    component: CadastrarContatoComponent,
  },
  { path: '', component: ListarContatoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, TableModule],
})
export class AppRoutingModule {}
