import { Project } from '@domain/entities';
import { CreateProjectDto } from '@domain/interfaces/dto';
import { ProjectRepository } from '@domain/interfaces/repositories/project-repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectRepositoryImplement
  extends Repository<Project>
  implements ProjectRepository
{
  constructor(
    @InjectRepository(Project)
    private readonly ProjectRepository: Repository<Project>,
  ) {
    super(
      ProjectRepository.target,
      ProjectRepository.manager,
      ProjectRepository.queryRunner,
    );
  }

  async findAllProjectsOrderByDate(): Promise<Project[]> {
    const result = await this.ProjectRepository.find({
      order: { createAt: 'DESC' },
    });

    if (!result) {
      throw new NotFoundException(`La liste de Projects n'a pas etait trouver`);
    }
    return result;
  }

  async findProjectById(id: number): Promise<Project | null> {
    const result = await this.ProjectRepository.findOneBy({ id: id });

    if (!result) {
      throw new NotFoundException(
        "Le Project n'existe pas dans la base de donnee",
      );
    }
    return result;
  }

  async deleteProject(id: number): Promise<Project> {
    const result = await this.findProjectById(id);

    if (!result) {
      throw new NotFoundException(
        `Le Project a suprime n'existe pas dans la base de donnee`,
      );
    }
    const deleteProject = await this.ProjectRepository.delete(id);
    if (deleteProject.affected === 0) {
      throw new NotFoundException(
        `Le Project avec l' ${id} n'a pas etait trouver`,
      );
    }
    return result;
  }

  async createProject(ProjectData: CreateProjectDto): Promise<Project> {
    const createdProject: CreateProjectDtoImplement = { ...ProjectData };

    const result = this.ProjectRepository.create(createdProject);
    return await this.ProjectRepository.save(result);
  }
}
