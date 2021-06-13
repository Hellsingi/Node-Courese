import { v4 as uuid } from 'uuid';
import { Column } from './column.model';
import { IBoardProps } from './board.types';

export class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    id = uuid(),
    title = 'test',
    columns = [new Column()],
  }: IBoardProps = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}