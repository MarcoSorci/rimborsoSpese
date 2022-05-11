export interface WorkLeave {
  date: string;
  totalDays: number;
  type: string;
  id: string;
  notes?: string;

  userName?: string;
  userId?: string;
  approval: string;
  approvalDate?: Date;
  approverName?: string;
}
