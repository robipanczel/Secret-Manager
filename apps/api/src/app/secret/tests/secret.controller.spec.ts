import { Test, TestingModule } from '@nestjs/testing';
import {
  PaginationQuery,
  ReadSecretDto,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { SecretController } from '../secret.controller';
import { SecretService } from '../secret.service';
import {
  createSecretDto,
  readSecretMetaDtos,
  secretStub,
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
            getSecret: jest.fn().mockResolvedValue(secretStub()),
            createSecret: jest.fn().mockResolvedValue(secretStub()),
            getAllSecretMetaData: jest
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
    let secret: ReadSecretDto;

    beforeEach(async () => {
      serviceGetSecretSpy = jest.spyOn(secretService, 'getSecret');
      secret = await controller.getSecret(secretStub().hashedSecretText);
    });

    it('should be defined', () => {
      expect(controller.getSecret).toBeDefined();
    });

    it('should call secretService.getSecret()', async () => {
      expect(serviceGetSecretSpy).toHaveBeenCalled();
    });

    it('should call secretService.getSecret() with hashedSecret', async () => {
      expect(serviceGetSecretSpy).toHaveBeenCalledWith(
        secretStub().hashedSecretText
      );
    });

    it('should return a secret object', async () => {
      expect(secret).toEqual(secretStub());
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
      expect(createdSecret).toEqual(secretStub());
    });
  });

  describe('when getAllSecretMetaData is called', () => {
    let serviceGetAllSecretMetaDataSpy: jest.SpyInstance;
    let secretNames: ReadSecretMetaDto[];
    let paginationQuery: PaginationQuery;

    beforeEach(async () => {
      serviceGetAllSecretMetaDataSpy = jest.spyOn(
        secretService,
        'getAllSecretMetaData'
      );
      paginationQuery = new PaginationQuery(1, 0);
      secretNames = await controller.getAllSecretMetaData(paginationQuery);
    });

    it('should be defined', async () => {
      expect(controller.getAllSecretMetaData).toBeDefined();
    });

    it('should call secretService.getAllSecretMetaData()', async () => {
      expect(serviceGetAllSecretMetaDataSpy).toHaveBeenCalled();
    });

    it('should call secretService.getAllSecretMetaData() with PaginationQuery', async () => {
      expect(serviceGetAllSecretMetaDataSpy).toHaveBeenCalledWith(
        paginationQuery
      );
    });

    it('should return a ReadSecretMetaDto object', async () => {
      expect(secretNames).toEqual(readSecretMetaDtos());
    });
  });
});
