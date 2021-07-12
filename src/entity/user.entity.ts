import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  login!: string;
  @Column()
  name!: string;
  @Column()
  password!: string;
}

export default User;
