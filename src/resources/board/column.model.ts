import { v4 as uuid } from 'uuid';
import { IColumnProps } from './column.types';

export class Column {
  id: string;

  title: string;

  order: number;

  constructor({
    id = uuid(),
    title = 'Column Title',
    order = 0,
  }: IColumnProps = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
