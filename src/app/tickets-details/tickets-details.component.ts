import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TicketsService } from '../tickets.service';
import { Ticket } from '../Tickets.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './tickets-details.component.html',
  styleUrls: ['./tickets-details.component.scss']
})
export class TicketsDetailsComponent implements OnInit {
  ticket: Ticket | null = null;
  messageCards: string[] = [];
  newMessage = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const ticketId = params.get('id');
      if (ticketId) {
        this.loadTicket(ticketId);
      }
    });
  }

  loadTicket(ticketId: string): void {
    this.ticketsService.getTicket(ticketId).subscribe((ticket: Ticket) => {
      this.ticket = ticket;
    });
  }

  toggleTicketStatus(): void {
    //  logic to toggle the ticket status (Open/Closed)
  }

  addMessage(): void {
    const newMessageText = this.newMessage.value;
    if (newMessageText) {
      this.messageCards.push(newMessageText);
      this.newMessage.reset();
    }
  }
}
