import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entitites/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [Task],
      synchronize: true,
    }),
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}