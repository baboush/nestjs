import { Message } from '@domain/entities';
import { MessageRepositoryImplement } from './message.repository.implement';
import { TestingModule, Test } from '@nestjs/testing';
import { CreateMessageDto } from '@domain/interfaces';
import { Repository } from 'typeorm';

const repositoryMock = {
  save: jest.fn(),
};
describe('MessageRepositoryImplement', () => {
  let repository: MessageRepositoryImplement;
  let typeOrmRepository: Repository<Message>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageRepositoryImplement,
        { provide: Repository, useValue: repositoryMock },
      ],
    }).compile();
    repository = module.get<MessageRepositoryImplement>(
      MessageRepositoryImplement,
    );
    typeOrmRepository = module.get<Repository<Message>>(Repository);
  });

  it('should save message', async () => {
    const messageData: CreateMessageDto = {
      name: 'testtes',
      email: 'fdsfj@gmail.com',
      content: 'testsetjdkgjfdklgjdfklgjdfkljg',
    };

    const createdMessage = { id: 1, ...messageData };
    repositoryMock.save.mockResolvedValue(messageData);

    const result: Message = await repository.createMessage(messageData);
    expect(result).toEqual(createdMessage);
    expect(typeOrmRepository.save).toHaveBeenCalledWith(messageData);
  });
});
