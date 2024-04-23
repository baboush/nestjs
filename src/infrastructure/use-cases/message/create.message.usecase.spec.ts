import { Test, TestingModule } from '@nestjs/testing';
import { CreateMessageDto } from '@domain/interfaces';
import { CreateMessageUsecaseImplement } from '@infrastructure/use-cases/message/create.message.usecase';
import { MessageServiceImplement } from '@infrastructure/services';
import { MessageRepositoryImplement } from '@infrastructure/repositories';

const messageRepositoryMock = {
  createMessage: jest.fn(),
};

const messageServiceMock = {
  create: jest.fn(),
};
describe('CreateMessageUsecaseTs', () => {
  let useCase: CreateMessageUsecaseImplement;
  let repository: MessageRepositoryImplement;
  let service: MessageServiceImplement;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMessageUsecaseImplement,
        { provide: MessageServiceImplement, useValue: messageServiceMock },
        {
          provide: MessageRepositoryImplement,
          useValue: messageRepositoryMock,
        },
      ],
    }).compile();

    useCase = moduleRef.get<CreateMessageUsecaseImplement>(
      CreateMessageUsecaseImplement,
    );
    service = moduleRef.get<MessageServiceImplement>(MessageServiceImplement);
    repository = moduleRef.get<MessageRepositoryImplement>(
      MessageRepositoryImplement,
    );
  });
  it('should be create message  usecase', async () => {
    const messageDto: CreateMessageDto = {
      name: 'Laura',
      email: 'laur@gmail.com',
      content: "Laura adore linux et elle va bientot l'installer",
    };

    const createdMessage = { id: 1, ...messageDto };
    const result = await useCase.execute(messageDto);
    console.log(result);

    expect(result).toEqual(createdMessage);
    expect(service.create).toHaveBeenCalledWith(messageDto);
    expect(repository.createMessage).toHaveBeenCalledWith(messageDto);
  });
});
