export interface Billing {
  id: string;
  patientId: string;
  amount: number;
  date: Date;
  status: 'paid' | 'unpaid';
  items: { description: string; amount: number }[];
  hospitalId: string;
}
