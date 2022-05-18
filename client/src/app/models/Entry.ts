export interface Entry {
  id?: number | null;
  projectId: number | null;
  description: string;
  timeSpent: number;
  hourlyRate: number;
  totalPrice: number;
}
