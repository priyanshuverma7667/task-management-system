import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: 'database.sqlite',
    entities: [Task, User],
    synchronize: true,
  }),
  TasksModule,
  AuthModule,
],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}