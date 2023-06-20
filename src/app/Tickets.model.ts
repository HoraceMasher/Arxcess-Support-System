export interface Ticket {
    id: string;
    name: string;
    dateCreated: Date;
    lastActivity: Date;
    status: string;
    message: string[];
    email: string;
  }
  