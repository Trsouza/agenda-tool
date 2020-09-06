import { ContactCreateComponent } from './contact/contact-create/contact-create.component';
import { ContactDeleteComponent } from './contact/contact-delete/contact-delete.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDeleteComponent } from './client/client-delete/client-delete.component';
import { ClientUpdateComponent } from './client/client-update/client-update.component';
import { ClientCreateComponent } from './client/client-create/client-create.component';
import { ContactCrudComponent } from './views/contact-crud/contact-crud.component';
import { ClientCrudComponent } from './views/client-crud/client-crud.component';
import { HomeComponent } from './views/home/home.component';
import { ContactUpdateComponent } from './contact/contact-update/contact-update.component';

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
  }, 
  {
    path: "contatos",
    component: ContactCrudComponent
  },
  {
    path: "contatos/editar/:id",
    component: ContactUpdateComponent
  },
  {
    path: "contatos/excluir/:id",
    component: ContactDeleteComponent
  }, 
  {
    path: "clientes/:id/contatos", 
    component: ContactListComponent
  },
  {
    path: "clientes/:id/contatos/criar", 
    component: ContactCreateComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
