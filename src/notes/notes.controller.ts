import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NoteDto } from './dto/note.dto';

@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'La note a été créée avec succès',
    type: CreateNoteDto,
  })
  @ApiConflictResponse({
    description: 'Une erreur est survenue lors de la création de la note',
  })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<NoteDto> {
    const note = await this.notesService.create(createNoteDto);
    return new NoteDto(note);
  }

  @Get()
  async findAll(): Promise<NoteDto[]> {
    const notes = await this.notesService.findAll();
    return notes.map((note) => new NoteDto(note));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NoteDto> {
    const note = await this.notesService.findOne(+id);
    return new NoteDto(note);
  }

  @Get('title/:title')
  async findByTitle(@Param('title') title: string): Promise<NoteDto[]> {
    const notes = await this.notesService.findByTitle(title);
    return notes.map((note) => new NoteDto(note));
  }

  @Patch(':id')
  @ApiNoContentResponse({
    description: 'Successful update',
  })
  update(
    @Param('id') id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<void> {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Note supprimée avec succès',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.notesService.remove(+id);
  }
}
