import { GetMessageDto } from '@domain/interfaces/dto';

export interface GetMessageUsecase {
  execute(id: number): Promise<GetMessageDto>;
}
