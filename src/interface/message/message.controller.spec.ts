import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { CreateMessageUsecaseImplement } from '@infrastructure/use-cases';
import { CreateMessageDto } from '@domain/interfaces';

const messageUseCaseMock = {
  execute: jest.fn(),
};

describe('MessageController', () => {
  let controller: MessageController;
  let useCase: CreateMessageUsecaseImplement;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: CreateMessageUsecaseImplement,
          useValue: messageUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    useCase = module.get<CreateMessageUsecaseImplement>(
      CreateMessageUsecaseImplement,
    );
    it('should be controller create', async () => {
      const createMessageDto: CreateMessageDto = {
        name: 'etsgfdgd',
        email: 'fdkfjk@gjfdkgj.com',
        content: 'fjdkljgdsfklgjdlsfkgjdslkgjsdlfkgjsdlkgj',
      };
      const createdMessage = { id: 1, ...createMessageDto };
      messageUseCaseMock.execute.mockResolvedValue(createdMessage);
      const result = await controller.create(createMessageDto);

      expect(result).toEqual(createdMessage);
      expect(useCase.execute).toHaveBeenCalledWith(createMessageDto);
    });
  });
});
