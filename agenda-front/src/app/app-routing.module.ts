import { ClientDeleteComponent } from './client/client-delete/client-delete.component';
import { ClientUpdateComponent } from './client/client-update/client-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ClientCrudComponent } from './views/client-crud/client-crud.component';
import { ClientCreateComponent } from './client/client-create/client-create.component';

const routes: Routes = [{
  path: "", /* Nome da rota */
  component: HomeComponent
},
  {
    path: "clientes", /* Nome da rota */
    component: ClientCrudComponent
  },
  {
    path: "clientes/criar",
    component: ClientCreateComponent
  },
  {
    path: "clientes/editar/:id",
    component: ClientUpdateComponent
  },
  {
    path: "clientes/excluir/:id",
    component: ClientDeleteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
