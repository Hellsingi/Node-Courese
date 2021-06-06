import { Column } from './column.model';

export interface IBoardProps {
  id?: string;
  title?: string;
  columns?: Column[];
}
