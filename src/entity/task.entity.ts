import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title!: string;
  @Column()
  order?: number = 0;
  @Column()
  description!: string;
  @Column({
    type: 'text',
    nullable: true
  })
  boardId?: string | null = 'boardId';

  @Column({
    type: 'text',
    nullable: true
  })
  columnId?: string | null = 'columnId';

  @Column({
    type: 'text',
    nullable: true
  })
  userId?: string | null = 'userId';
}

export default Task;
