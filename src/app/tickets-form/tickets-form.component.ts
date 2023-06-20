import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../tickets.service';
import { Ticket } from '../Tickets.model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './tickets-form.component.html',
  styleUrls: ['./tickets-form.component.scss']
})
export class TicketsFormComponent implements OnInit {
  ticketForm: FormGroup;
  categories: Ticket[] = [];
  subcategories: Ticket[] = [];
  tertiarySubcategories: Ticket[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService
  ) {
    this.ticketForm = this.formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      tertiarySubcategory: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.ticketsService.getCategories().subscribe((response: any) => {
      this.categories = response.categories;
    });
}  
  

  loadSubcategories(categoryId: string): void {
    this.ticketsService.getSubcategories(categoryId).subscribe((subcategories: any) => {
      this.subcategories = subcategories;
    });
  }

  loadTertiarySubcategories(subcategoryId: string): void {
    this.ticketsService.getTertiarySubcategories(subcategoryId).subscribe((tertiarySubcategories: any) => {
      this.tertiarySubcategories = tertiarySubcategories;
    });
  }

  submitTicket(): void {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;
      this.ticketsService.submitTicket(ticketData).subscribe(response => {
        // Handle the response as needed
      });
    }
  }
}
