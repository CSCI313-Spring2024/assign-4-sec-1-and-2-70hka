import { Injectable } from '@angular/core';
import { Contact } from './contact.model';	

@Injectable({
  providedIn: 'root'
})
export class ContactService {
	private contacts: Contact[] = [
		{
			firstName: 'John',
			lastName: 'Doe',
			phone: '123-456-7890'
		},
		{
			firstName: 'Jane',
			lastName: 'Smith',
			phone: '987-654-3210'
		}
	];
	getContacts(): Contact[] {
		return this.contacts;
	}
	addContact(contact: Contact): void {
		this.contacts.push(contact);
	}

	deleteContact(contact: Contact): void {
		this.contacts = this.contacts.filter(c => 
			!(c.firstName === contact.firstName && c.lastName === contact.lastName && c.phone === contact.phone)
		);
	}
  constructor() { }
}
