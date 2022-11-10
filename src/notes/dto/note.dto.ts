import { ApiProperty } from '@nestjs/swagger';
import { Note } from '../entities/note.entity';

type NoteProperties = Required<NoteDto>;
export enum State {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

export class NoteDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty({ enum: State })
  state: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(value: Note) {
    this.id = value.id ?? 0;
    this.title = value.title ?? '';
    this.content = value.content ?? '';
    this.state = value.state ?? State.ACTIVE;
    this.createdAt = value.createdAt ?? new Date();
    this.updatedAt = value.updatedAt ?? new Date();
  }
}
