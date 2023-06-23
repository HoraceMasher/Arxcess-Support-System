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
 userJwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcnAiLCJpYXQiOjE2ODc1NDYxODYsImJ1c2luZXNzIjoibWFjJ24gbWF4IiwiZ3JvdXBzIjpbIkNVU1RPTUVSIl0sInVwbiI6ImRlbW9AYWNjb3VudC5jb20iLCJpc3MiOiJzdXBwb3J0IHNlcnZlciIsImV4cCI6MTY4NzU0OTc4NiwianRpIjoiZmZjMGMzY2ItOTM1ZC00ZTJiLWE2YTctMjQ0OGRlMmU1ZGZhIn0.T0s1C8WVAsIVtqeGwuOp7uPBA9sJIMemMFKPUdDXwZQ';

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
    this.ticketsService.getCategories(this.userJwtToken).subscribe((response: any) => {
      this.categories = response.data ;
    },
    (error: any) => {
      console.error('Failed to load categories:', error);
    }
      );
  }

  loadSubcategories(categoryId: string): void {
    this.ticketsService.getSubcategories(categoryId, this.userJwtToken).subscribe(
      (response: any) => {
        this.subcategories = response.data;
      },
      (error: any) => {
        console.error('Failed to load subcategories:', error);
      }
    );
  }

  loadTertiarySubcategories(subcategoryId: string): void {
    this.ticketsService.getTertiarySubcategories(subcategoryId, this.userJwtToken).subscribe((response: any) => {
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
      this.ticketsService.submitTicket(ticketData, this.userJwtToken).subscribe(response => {
        // Handle the response as needed
      });
    }
  }
}
