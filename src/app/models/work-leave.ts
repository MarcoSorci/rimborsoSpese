export interface WorkLeave {
  date: string;
  hours: string;
  type: string;
  id: string;
  notes?: string;

  userName?: string;
  userId?: string;
  approval: string;
  approvalDate?: Date;
  approverName?: string;
}
