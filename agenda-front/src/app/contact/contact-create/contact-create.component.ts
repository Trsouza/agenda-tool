import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from './../contact.service';
import { Contact } from './../contact.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {


  contact: Contact = {
    nome: '',
    telefone: '',
    email: '',
  }

  constructor(private contactService: ContactService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  createContact(): void {
    const id = + this.route.snapshot.paramMap.get('id')
    this.contactService.createContact(id, this.contact).subscribe(() => {
      this.contactService.showMessage('Cliente criado!')
      this.router.navigate(['/contatos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/contatos'])
  }
}
