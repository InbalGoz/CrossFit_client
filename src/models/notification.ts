export interface Notification {
  id?: number;
  title: string;
  desc: string;
  isRead: boolean;
  createdAt: Date | null;
  customerId:number;
}
