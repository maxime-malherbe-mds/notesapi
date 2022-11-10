import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum State {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title?: string;
  @Column()
  public content?: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  public state: State = State.ACTIVE;
  @Column()
  public createdAt: Date = new Date();
  @Column()
  public updatedAt: Date = new Date();
}
