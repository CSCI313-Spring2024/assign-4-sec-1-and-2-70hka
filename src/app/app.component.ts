import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment-4';
}
