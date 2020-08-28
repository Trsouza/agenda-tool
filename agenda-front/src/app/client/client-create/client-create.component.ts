import { ClientService } from './../client.service';
import { Client } from './../client.model';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  client: Client = {
    nome: '',
    telefone: '',
    email: '',
    // dataRegistro: ''
  }

  constructor(private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
    createClient(): void {
      this.clientService.create(this.client).subscribe(() => {
        this.clientService.showMessage('Cliente criado!')
        this.router.navigate(['/clientes'])
      })
    }

  cancel(): void {
    this.router.navigate(['/clientes'])
  }
}
