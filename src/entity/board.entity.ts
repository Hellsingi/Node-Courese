import TaskColumn from './column.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'board' })
class Board {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title!: string;

  @OneToMany('column', 'board')
  columns?: TaskColumn[];
}

export default Board;
