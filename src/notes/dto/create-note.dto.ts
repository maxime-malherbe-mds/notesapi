import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
