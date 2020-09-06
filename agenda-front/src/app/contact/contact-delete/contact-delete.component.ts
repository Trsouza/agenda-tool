import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './../contact.service';
import { Contact } from './../contact.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {
  
  contact: Contact;

  constructor(private contactService: ContactService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = + this.route.snapshot.paramMap.get('id')
    this.contactService.readContactById(id).subscribe(contact => {
      this.contact = contact
    })
  }

  deleteContact(): void {
    this.contactService.deleteContact(this.contact.id).subscribe(() => {
      this.contactService.showMessage("Contato excluído com sucesso!")
      this.router.navigate(['/contatos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/contatos'])
  }
}
