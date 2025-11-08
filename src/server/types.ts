export interface Reminder {
  id: string;
  email: string;
  subject: string;
  message: string;
  sendAt: Date;
  sent: boolean;
  createdAt: Date;
}
