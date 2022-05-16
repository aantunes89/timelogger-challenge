export interface Entry {
  id?: number | null;
  projectId: number | null;
  taskDescription: string;
  timeSpent: number;
  hourlyPrice: number;
  totalPrice: number;
}
/*
  taskDescription => Tarefa Executada (compra de material, execução de tarefa manual, etc...)
  timeSpent => Tempo gasto na tarefa
  hourlyPrice => Valor da Hora
  totalPrice => Valor total da tarefa
*/
