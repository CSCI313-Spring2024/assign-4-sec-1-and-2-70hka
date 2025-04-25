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
	showEditForm = false;

	newContact: Contact = {
		firstName: '',
		lastName: '',
		phone: ''
	}
	editContactData: Contact = {
		firstName: '',
		lastName: '',
		phone: ''
	};
	contactBeingEdited: Contact | null = null;
	

	constructor(private contactService: ContactService) { }

	ngOnInit(): void {
		this.contacts = this.contactService.getContacts();
	}

	toggleView(mode: 'list' | 'add' | 'edit', contactToEdit?: Contact): void {
		this.showAddForm = mode === 'add';
		this.showEditForm = mode === 'edit';
	
		if (mode === 'edit' && contactToEdit) {
			this.contactBeingEdited = contactToEdit;
			this.editContactData = { ...contactToEdit };
		} else {
			this.contactBeingEdited = null;
		}
	}
	

	addContact(): void {
		if (this.newContact.firstName && this.newContact.lastName && this.newContact.phone) {
			this.contactService.addContact({ ...this.newContact });
			this.newContact = { firstName: '', lastName: '', phone: ''};
			this.showAddForm = false;
		}
	}

	deleteContact(contact: Contact): void {
		this.contactService.deleteContact(contact);
		this.contacts = this.contactService.getContacts();
	}

	submitEdit(): void {
		if (!this.contactBeingEdited) return;
	
		const index = this.contacts.findIndex(
			c =>
				c.firstName === this.contactBeingEdited!.firstName &&
				c.lastName === this.contactBeingEdited!.lastName &&
				c.phone === this.contactBeingEdited!.phone
		);
	
		if (index !== -1) {
			this.contacts[index] = { ...this.editContactData };
		} else {
			console.warn('contact not found for editing');
		}
	
		this.showEditForm = false;
		this.contactBeingEdited = null;
	}
	
	
	
}
