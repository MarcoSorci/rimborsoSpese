export interface Expense {
  date: string;
  type: string;
  amount: number;
  hasReceipt: string;
  notes?: string;

  approval?: string;
  reimbursement?: number;
  userName?: string;
  id: string;
}
