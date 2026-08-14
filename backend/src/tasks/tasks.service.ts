import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  // ...existing methods below
  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto); // builds a Task instance (not saved yet)
    return this.tasksRepository.save(task); // actually writes it to the database
  }

  async findAll() {
    return this.tasksRepository.find();
  }
  async findOne(id: string) {
  const task = await this.tasksRepository.findOne({ where: { id } });
  if (!task) {
    throw new NotFoundException(`Task with id ${id} not found`);
  }
  return task;
}

  async update(id: string, updateTaskDto: UpdateTaskDto) {
  const task = await this.findOne(id);
  Object.assign(task, updateTaskDto);
  return this.tasksRepository.save(task);
}

  async remove(id: string) {
  const task = await this.findOne(id);
  return this.tasksRepository.remove(task);
}
}
