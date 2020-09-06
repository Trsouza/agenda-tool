import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from './../contact.model';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  contact: Contact

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const id = + this.route.snapshot.paramMap.get('id')
    this.contactService.readContactById(id).subscribe({
      next: contact => this.contact = contact,
      error: err => console.log('Error ' + err)
    })
  }

  updateContact(): void {
    this.contactService.updateContact(this.contact).subscribe(() => {
      this.contactService.showMessage('Contato atualizado com sucesso')
    })
    this.router.navigate(["/contatos"])
  }

  cancel(): void {
    this.router.navigate(['/contatos'])
  }
}
