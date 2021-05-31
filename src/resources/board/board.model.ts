import { Column } from './column.model';
import { IBoardProps } from './board.types';

const uuid = require('uuid').v4;

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