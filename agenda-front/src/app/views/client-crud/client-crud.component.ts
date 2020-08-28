import { HeaderService } from '../../templates/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-crud',
  templateUrl: './client-crud.component.html',
  styleUrls: ['./client-crud.component.css']
})
export class ClientCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Clientes',
      routeUrl: '/clientes'
    }
  }

  ngOnInit(): void {
  }

  navigateToClientCreate(): void {
    this.router.navigate(['/clientes/criar'])
  }
}