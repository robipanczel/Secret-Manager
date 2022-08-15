import { Test, TestingModule } from '@nestjs/testing';
import {
  PaginationQuery,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Secret } from '../schemas/secret.schema';
import { SecretController } from '../secret.controller';
import { SecretService } from '../secret.service';
import {
  createSecretDto,
  readSecretMetaDtos,
  secretDtoStub,
} from './stubs/secret.dto.stub';

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
            getSecret: jest.fn().mockResolvedValue(secretDtoStub()),
            createSecret: jest.fn().mockResolvedValue(secretDtoStub()),
            getAllSecretNames: jest
              .fn()
              .mockResolvedValue(readSecretMetaDtos()),
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
    let secret: Secret;

    beforeEach(async () => {
      serviceGetSecretSpy = jest.spyOn(secretService, 'getSecret');
      secret = await controller.getSecret(secretDtoStub().hashedSecretText);
    });

    it('should be defined', () => {
      expect(controller.getSecret).toBeDefined();
    });

    it('should call secretService.getSecret()', async () => {
      expect(serviceGetSecretSpy).toHaveBeenCalled();
    });

    it('should call secretService.getSecret() with hashedSecret', async () => {
      expect(serviceGetSecretSpy).toHaveBeenCalledWith(
        secretDtoStub().hashedSecretText
      );
    });

    it('should return a secret object', async () => {
      expect(secret).toEqual(secretDtoStub());
    });
  });

  describe('when createSecret is called', () => {
    let serviceCreateSecretSpy: jest.SpyInstance;
    let createdSecret: ReadSecretMetaDto;

    beforeEach(async () => {
      serviceCreateSecretSpy = jest.spyOn(secretService, 'createSecret');
      createdSecret = await controller.createSecret(createSecretDto());
    });

    it('should be defined', async () => {
      expect(controller.createSecret).toBeDefined();
    });

    it('should call secretService.createSecret()', async () => {
      expect(serviceCreateSecretSpy).toHaveBeenCalled();
    });

    it('should call secretService.createSecret() with secretDto', async () => {
      expect(serviceCreateSecretSpy).toHaveBeenCalledWith(createSecretDto());
    });

    it('should return a secret object', async () => {
      expect(createdSecret).toEqual(secretDtoStub());
    });
  });

  describe('when getAllSecretNames is called', () => {
    let serviceGetAllSecretNamesSpy: jest.SpyInstance;
    let secretNames: ReadSecretMetaDto[];
    let paginationQuery: PaginationQuery;

    beforeEach(async () => {
      serviceGetAllSecretNamesSpy = jest.spyOn(
        secretService,
        'getAllSecretNames'
      );
      paginationQuery = new PaginationQuery(1, 0);
      secretNames = await controller.getAllSecretNames(paginationQuery);
    });

    it('should be defined', async () => {
      expect(controller.getAllSecretNames).toBeDefined();
    });

    it('should call secretService.GetAllSecretNames()', async () => {
      expect(serviceGetAllSecretNamesSpy).toHaveBeenCalled();
    });

    it('should call secretService.GetAllSecretNames() with PaginationQuery', async () => {
      expect(serviceGetAllSecretNamesSpy).toHaveBeenCalledWith(paginationQuery);
    });

    it('should return a ReadSecretMetaDto object', async () => {
      expect(secretNames).toEqual(readSecretMetaDtos());
    });
  });
});
