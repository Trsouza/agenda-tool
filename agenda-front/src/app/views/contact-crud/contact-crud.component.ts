import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../templates/header/header.service';

@Component({
  selector: 'app-contact-crud',
  templateUrl: './contact-crud.component.html',
  styleUrls: ['./contact-crud.component.css']
})
export class ContactCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Contatos',
      routeUrl: '/contatos'
    }
  }

  ngOnInit(): void {
  }

}
