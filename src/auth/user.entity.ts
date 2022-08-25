import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';
import { BoardEntity } from '../boards/board.entity';
import { TaskEntity } from '../tasks/task.entity';
import { Exclude } from 'class-transformer';
import { ReportsEntity } from '../reports/reports.entity';

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  // @Exclude()
  password: string;

  @Column()
  age: number;

  @OneToMany((type) => BoardEntity, (board) => board.user, { eager: true })
  boards: BoardEntity[];

  @OneToMany((type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];

  @OneToMany((type) => ReportsEntity, (report) => report.user)
  reports: ReportsEntity[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
