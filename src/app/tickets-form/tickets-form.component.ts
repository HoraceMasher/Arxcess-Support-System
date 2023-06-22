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

      // Subscribe to category value changes
      this.ticketForm.get('category')?.valueChanges.subscribe((categoryId: string) => {
        if (categoryId) {
          this.loadSubcategories(categoryId);
        } else {
          this.subcategories = []; // Clear subcategories if no category is selected
        }
      });

      this.ticketForm.get('subcategory')?.valueChanges.subscribe((subcategoryId: string) =>{
        if (subcategoryId) {
          this.loadTertiarySubcategories(subcategoryId);
        } else {
          this.tertiarySubcategories = []; // Clear Tertiary subcategories 
        }
      }
      );
  }

  loadCategories(): void {
    this.ticketsService.getCategories().subscribe((response: any) => {
      this.categories = response.data ;
    },
    (error: any) => {
      console.error('Failed to load categories:', error);
    }
      );
  }

  loadSubcategories(categoryId: string): void {
    this.ticketsService.getSubcategories(categoryId).subscribe(
      (response: any) => {
        this.subcategories = response.data;
      },
      (error: any) => {
        console.error('Failed to load subcategories:', error);
      }
    );
  }

  loadTertiarySubcategories(subcategoryId: string): void {
    this.ticketsService.getTertiarySubcategories(subcategoryId).subscribe((response: any) => {
      this.tertiarySubcategories = response.data;
    },
    (error: any) => {
      console.error('Failed to load subcategories:', error);
    }
    );
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
