export interface Expense {
  date: string;
  type: string;
  amount: number;
  hasReceipt: boolean;
  notes?: string;
}
