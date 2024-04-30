import { Test, TestingModule } from '@nestjs/testing';
import { ProjectimplementController } from './projectimplement.controller';

describe('ProjectimplementController', () => {
  let controller: ProjectimplementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectimplementController],
    }).compile();

    controller = module.get<ProjectimplementController>(ProjectimplementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
