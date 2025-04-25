import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
	contacts: Contact[] = [];
	showAddForm = false;

	newContact: Contact = {
		firstName: '',
		lastName: '',
		phone: ''
	}

	constructor(private contactService: ContactService) { }

	ngOnInit(): void {
		this.contacts = this.contactService.getContacts();
	}

	toggleView(addMode: boolean): void {
		this.showAddForm = addMode;
	}

	addContact(): void {
		if (this.newContact.firstName && this.newContact.lastName && this.newContact.phone) {
			this.contactService.addContact({ ...this.newContact });
			this.newContact = { firstName: '', lastName: '', phone: ''};
			this.showAddForm = false;
		}
	}
}
