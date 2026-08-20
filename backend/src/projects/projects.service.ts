import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAll(userId: string) {
    return this.projectsRepository.find({ where: { userId } });
  }

  async findOne(id: string, userId: string) {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    if (project.userId !== userId) {
      throw new ForbiddenException('You do not have access to this project');
    }
    return project;
  }

  async create(dto: CreateProjectDto, userId: string) {
    const project = this.projectsRepository.create({ ...dto, userId });
    return this.projectsRepository.save(project);
  }

  async update(id: string, dto: UpdateProjectDto, userId: string) {
    const project = await this.findOne(id, userId);
    Object.assign(project, dto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string, userId: string) {
    const project = await this.findOne(id, userId);
    return this.projectsRepository.remove(project);
  }
}