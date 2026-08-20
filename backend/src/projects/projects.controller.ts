import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto, @Req() req) {
    return this.projectsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.projectsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto, @Req() req) {
    return this.projectsService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.projectsService.remove(id, req.user.userId);
  }
}