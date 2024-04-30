import { Project } from '@domain/entities';
import { CreateProjectDto } from '../dto/project/create-project-dto.interface';

export interface ProjectRepository {
  findAllProjectsOrderByDate(): Promise<Project[]>;
  findProjectById(id: number): Promise<Project | null>;
  deleteProject(id: number): Promise<Project>;
  createProject(ProjectData: CreateProjectDto): Promise<Project>;
}
