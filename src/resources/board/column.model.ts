import { IColumnProps } from './column.types';

const uuid = require('uuid').v4;

export class Column {
  id: string;

  title: string;

  order: number;

  constructor({
    id = uuid.v4(),
    title = 'Column Title',
    order = 0,
  }: IColumnProps = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
