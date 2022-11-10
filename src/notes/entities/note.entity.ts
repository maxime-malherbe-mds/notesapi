import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


type NoteProperties = Required<Note>;
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


  public static fromProperties(value: NoteProperties): Note {
    const note = new Note();
    note.id = value.id;
    note.title = value.title;
    note.content = value.content;
    note.state = value.state;
    note.createdAt = value.createdAt;
    note.updatedAt = value.updatedAt;
    return note;
  }

}
