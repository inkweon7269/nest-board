import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}