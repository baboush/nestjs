import { Project } from '@domain/entities';
import { CreateProjectDto } from '@domain/interfaces/dto';
import { ProjectRepositoryImplement } from '@infrastructure/repositories/projectimplement/projectimplement.controller';
import {
  CreateProjectDtoImplement,
  GetProjectDtoImplement,
} from '@interface/Project/dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ProjectServiceImplement {
  constructor(
    @InjectRepository(ProjectRepositoryImplement)
    private readonly ProjectRepository: ProjectRepositoryImplement,
  ) {}

  async create(ProjectData: CreateProjectDto): Promise<Project> {
    let createdProject: CreateProjectDtoImplement =
      new CreateProjectDtoImplement();
    createdProject = { ...ProjectData };

    return await this.ProjectRepository.createProject(createdProject);
  }

  async findAllOrderByDate(): Promise<Project[]> {
    const result = await this.ProjectRepository.findAllProjectsOrderByDate();

    if (!result) {
      throw new NotFoundException(
        `Le Project n'existe pas dans la base de donnee`,
      );
    }

    const ProjectsData: GetProjectDtoImplement[] = result.map((Project) => ({
      id: Project.id,
      title: Project.title,
      images: Project.images,
      technologie: Project.technologie,
      content: Project.content,
      createAt: Project.createAt,
    }));
    return ProjectsData;
  }

  async findOne(id: number): Promise<Project> {
    let Project: GetProjectDtoImplement = new GetProjectDtoImplement();
    const result = await this.ProjectRepository.findProjectById(id);

    if (!result) {
      throw new NotFoundException(
        `Le Project n'existe pas dans la base de donnee`,
      );
    }
    Project = { ...result };
    return Project;
  }

  async remove(id: number): Promise<Project> {
    const result = await this.ProjectRepository.deleteProject(id);

    if (!result) {
      throw new NotFoundException(
        `Le Project n'existe pas dans la base de donnee`,
      );
    }
    return ProjectsData;
  }
}
