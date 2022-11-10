import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesRepository.save({
      ...createNoteDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  findOne(id: number): Promise<Note> {
    return this.notesRepository.findOneBy({ id });
  }

  findByTitle(title: string): Promise<Note[]> {
    return this.notesRepository.findBy({ title });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const result = await this.notesRepository.update(id, {
      ...updateNoteDto,
      updatedAt: new Date(),
    });
    if (result.affected == 0) {
      throw new NotFoundException('note introuvable');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('note introuvable');
    }
  }
}
