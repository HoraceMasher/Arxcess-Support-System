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
  userJwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcnAiLCJpYXQiOjE2ODc3OTcxNjUsImJ1c2luZXNzIjoibWFjJ24gbWF4IiwiZ3JvdXBzIjpbIkNVU1RPTUVSIl0sInVwbiI6ImRlbW9AYWNjb3VudC5jb20iLCJpc3MiOiJzdXBwb3J0IHNlcnZlciIsImV4cCI6MTY4NzgwMDc2NSwianRpIjoiYTE4Y2Y2NTQtZDY5Ny00ZDNkLTlmMTYtODEyM2I5Zjc4MzJlIn0.tmYaHuUByrEOf_k5j8PTaYUMu7owiPW-ZkqrK2tNfTk'
  fileName = '';
  uploadProgress: number | null = null;
  requiredFileType = 'image/*'; // Change the required file type accordingly

  constructor(
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService
  ) {
    this.ticketForm = this.formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      tertiarySubcategory: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      fileRequest: [null] // Added attachment form control
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

    this.ticketForm.get('subcategory')?.valueChanges.subscribe((subcategoryId: string) => {
      if (subcategoryId) {
        this.loadTertiarySubcategories(subcategoryId);
      } else {
        this.tertiarySubcategories = []; // Clear Tertiary subcategories
      }
    });
  }

  loadCategories(): void {
    this.ticketsService.getCategories(this.userJwtToken).subscribe(
      (response: any) => {
        this.categories = response.data;
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
    this.ticketsService.getTertiarySubcategories(subcategoryId, this.userJwtToken).subscribe(
      (response: any) => {
        this.tertiarySubcategories = response.data;
      },
      (error: any) => {
        console.error('Failed to load tertiary subcategories:', error);
      }
    );
  }

  submitTicket(): void {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;
      this.ticketsService.submitTicket(ticketData, this.userJwtToken).subscribe(
        (response: any) => {
          const ticketId = response.ticketId; // Assuming the response contains the ticket ID
          if (this.fileName) {
            // File is selected, perform file upload
            const file = this.ticketForm.get('attachment')?.value;
            this.uploadFile(ticketId, file);
          }
          // Handle successful ticket submission
        },
        (error: any) => {
          console.error('Failed to submit the ticket:', error);
        }
      );
    } else {
      console.error('Invalid form data. Please fill in all required fields.');
    }
  }

  uploadFile(ticketId: string, file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    this.ticketsService.attachFile(ticketId, file, this.userJwtToken).subscribe(
      (uploadResponse: any) => {
        // File upload successful, handle the response if needed
      },
      (uploadError: any) => {
        console.error('Failed to upload file:', uploadError);
      }
    );
  }

  // onFileSelected(event: any ,ticketId:string): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.fileName = file.name;
  //     this.ticketForm.get('attachment')?.setValue(file);

  //     // Perform file upload logic here
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     this.ticketsService.attachFile( ticketId,file, this.userJwtToken).subscribe(
  //       (uploadResponse: any) => {
  //         // File upload successful, handle the response if needed
  //       },
  //       (uploadError: any) => {
  //         console.error('Failed to upload file:', uploadError);
  //       }
  //     );

  //     if (event.total) {
  //       // Use event.total safely
  //       const progress = (event.loaded / event.total) * 100;
  //       this.uploadProgress = Math.round(progress);
  //     }
  //   }
  // }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.ticketForm.get('attachment')?.setValue(file);
  
      const ticketId = 'your-ticket-id'; // Replace with the actual ticket ID
  
      // Perform file upload logic here
      const formData = new FormData();
      formData.append('file', file);
      this.ticketsService.attachFile(ticketId, file, this.userJwtToken).subscribe(
        (uploadResponse: any) => {
          // File upload successful, handle the response if needed
        },
        (uploadError: any) => {
          console.error('Failed to upload file:', uploadError);
        }
      );
  
      if (event.total) {
        // Use event.total safely
        const progress = (event.loaded / event.total) * 100;
        this.uploadProgress = Math.round(progress);
      }
    }
  }
  
  cancelUpload(): void {
    // Implement cancellation logic if needed
  }

  clearFile(): void {
    this.fileName = '';
    this.ticketForm.get('attachment')?.setValue(null);
  }
}
