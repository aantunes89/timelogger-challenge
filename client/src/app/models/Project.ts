import { Entry } from "./Entry";

export interface Project {
  id: number;
  name: string;
  deadLine: Date;
  entries: Entry[];
  totalPrice: number;
  totalTimeSpent: number;
}
