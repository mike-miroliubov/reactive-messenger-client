import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Contact} from "../model/AuthInfo";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-contacts',
  template: require('./contacts.component.html'),
})
export class ContactsComponent implements OnInit {
  @Input() selectedContact: Contact;

  @Output() onContactSelected = new EventEmitter<Contact>();
  contacts: Contact[] = [];

  constructor(private contactsService: ContactService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe(contacts => this.contacts = contacts.map(c => {
      return {id : c.id, name: c.userName}
    }))
  }

  contactSelected(contact: Contact): void {
    this.onContactSelected.emit(contact);
  }

  isSelected(contact: Contact): boolean {
    if (this.selectedContact) {
      return this.selectedContact.name === contact.name;
    }
    return false;
  }
}