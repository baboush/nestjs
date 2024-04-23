import { Test, TestingModule } from '@nestjs/testing';
import { MessageServiceImplement } from './message.service.implement';
import { CreateMessageDtoImplement } from '@interface/message/dto';
import { MessageRepositoryImplement } from '@infrastructure/repositories';

const messageRepositoryMock = {
  createMessage: jest.fn(),
};

describe('MessageService', () => {
  let service: MessageServiceImplement;
  let repositories: MessageRepositoryImplement;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageServiceImplement,
        {
          provide: MessageRepositoryImplement,
          useValue: messageRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MessageServiceImplement>(MessageServiceImplement);
    repositories = module.get<MessageRepositoryImplement>(
      MessageRepositoryImplement,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a message', async () => {
    const createMessageDto: CreateMessageDtoImplement = {
      name: 'Laura',
      email: 'laur@gmail.com',
      content: "Laura adore linux et elle va bientot l'installer",
    };
    messageRepositoryMock.createMessage.mockReturnValueOnce(
      Promise.resolve(createMessageDto),
    );
    const result = await service.create(createMessageDto);
    expect(result).toEqual(createMessageDto);
    expect(repositories.createMessage).toHaveBeenCalled();
  });
});
