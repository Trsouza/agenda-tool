import { ActivatedRoute } from '@angular/router';
import { ContactService } from './../contact.service';
import { Contact } from './../contact.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[]
  displayedColumns = ['id', 'name', 'email', 'phone', 'action']

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = + this.route.snapshot.paramMap.get('id')
    this.contactService.listContact(id).subscribe(contacts => {
      this.contacts = contacts
      console.log(contacts)
    })
  }

  // const id = + this.route.snapshot.paramMap.get('id')
  //   this.clientService.readById(id).subscribe(client => {
  //   this.client = client
  // })
  

}
