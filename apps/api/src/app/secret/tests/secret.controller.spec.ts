import { Test, TestingModule } from '@nestjs/testing';
import { SecretController } from '../secret.controller';
import { SecretService } from '../secret.service';
import { secretDtoStub } from './stubs/secret.dto.stub';

describe('SecretController', () => {
  let controller: SecretController;
  let secretService: SecretService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretController],
      providers: [
        {
          provide: SecretService,
          useFactory: () => ({
            getSecret: jest.fn().mockResolvedValue(secretDtoStub),
            createSecret: jest.fn().mockResolvedValue(secretDtoStub),
          }),
        },
      ],
    }).compile();

    controller = module.get<SecretController>(SecretController);
    secretService = module.get<SecretService>(SecretService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when getSecret is called', () => {
    let serviceGetSecretSpy: jest.SpyInstance;

    beforeEach(async () => {
      serviceGetSecretSpy = jest.spyOn(secretService, 'getSecret');
      await controller.getSecret(secretDtoStub().hashedSecretText);
    });

    it('should be defined', () => {
      expect(controller.getSecret).toBeDefined();
    });
    it('should call secretService.getSecret', async () => {
      expect(serviceGetSecretSpy).toHaveBeenCalled();
    });
    it('should call secretService.getSecret with hashedSecret', async () => {
      expect(serviceGetSecretSpy).toHaveBeenCalledWith(
        secretDtoStub().hashedSecretText
      );
    });
  });
});
