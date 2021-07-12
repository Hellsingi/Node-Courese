import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Board from './board.entity';
@Entity({ name: 'column' })
class TaskColumn {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string = 'title';

  @Column()
  order?: number = 0;

  @ManyToOne('board', 'columns', { onDelete: 'CASCADE' })
  board!: Board;
}

export default TaskColumn;
