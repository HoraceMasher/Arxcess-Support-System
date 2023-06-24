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
  userJwtToken ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcnAiLCJpYXQiOjE2ODc1OTA3NzksImJ1c2luZXNzIjoibWFjJ24gbWF4IiwiZ3JvdXBzIjpbIkNVU1RPTUVSIl0sInVwbiI6ImRlbW9AYWNjb3VudC5jb20iLCJpc3MiOiJzdXBwb3J0IHNlcnZlciIsImV4cCI6MTY4NzU5NDM3OSwianRpIjoiNGE2YjI3MDctYTkyOS00MjhhLWFiMTQtYTg4YzY3ZDQ3YmQ5In0.IJFh2tw7y-DHLY_j-CSLaCwb-wcCeUDY6Aex55h5ISk'

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
    this.ticketsService.getTicket(ticketId, this.userJwtToken).subscribe((ticket: Ticket) => {
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
