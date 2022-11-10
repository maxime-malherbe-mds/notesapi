import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'notes',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  }),
    NotesModule,
    
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
