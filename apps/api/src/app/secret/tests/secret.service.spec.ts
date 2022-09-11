import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateSecretDto,
  PaginationQuery,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Secret } from '../schemas/secret.schema';
import { SecretRepository } from '../secret.repository';
import { SecretService } from '../secret.service';
import {
  readSecretMetaDto,
  readSecretMetaDtos,
  secretStub,
} from './stubs/secret.dto.stub';

describe('SecretService', () => {
  let service: SecretService;
  let secretRepository: SecretRepository;

  const paginationQuery = new PaginationQuery(2, 0);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretService,
        {
          provide: SecretRepository,
          useFactory: () => ({
            findAll: jest.fn().mockResolvedValue(readSecretMetaDtos()),
            findOne: jest.fn().mockResolvedValue(secretStub()),
            create: jest.fn().mockResolvedValue(secretStub()),
            update: jest.fn(),
            remove: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<SecretService>(SecretService);
    secretRepository = module.get<SecretRepository>(SecretRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when getAllSecretMetaData is called', () => {
    let repositoryFindAllSpy: jest.SpyInstance;
    let secretMetas: ReadSecretMetaDto[];

    beforeEach(async () => {
      repositoryFindAllSpy = jest.spyOn(secretRepository, 'findAll');
      secretMetas = await service.getAllSecretMetaData(paginationQuery);
    });

    it('should be defined', () => {
      expect(service.getAllSecretMetaData).toBeDefined();
    });

    it('should call secretRepositry.findAll()', async () => {
      expect(repositoryFindAllSpy).toHaveBeenCalled();
    });

    it('should call secretRepositry.findAll() with paginationQuery data', async () => {
      expect(repositoryFindAllSpy).toHaveBeenCalledWith(paginationQuery);
    });

    it('should not return any secretText property', async () => {
      const secretTexts = secretMetas.filter(
        (secretMetas) => secretMetas['secretText']
      );
      expect(secretTexts.length).toEqual(0);
    });
  });

  describe('when getSecret is called', () => {
    let repositoryFindOneSpy: jest.SpyInstance;
    let repositoryRemoveSpy: jest.SpyInstance;
    let repositoryUpdateSpy: jest.SpyInstance;
    let secret: Secret;

    beforeEach(async () => {
      repositoryFindOneSpy = jest.spyOn(secretRepository, 'findOne');
      repositoryRemoveSpy = jest.spyOn(secretRepository, 'remove');
      repositoryUpdateSpy = jest.spyOn(secretRepository, 'update');
      secret = await service.getSecret(secretStub().hashedSecretText);
    });

    it('should be defined', () => {
      expect(service.getSecret).toBeDefined();
    });

    it('should call secretRepository.findOne()', async () => {
      expect(repositoryFindOneSpy).toHaveBeenCalled();
    });

    it('should call secretRepository.findOne() a hash', async () => {
      expect(repositoryFindOneSpy).toHaveBeenCalledWith(
        secretStub().hashedSecretText
      );
    });

    it('should call secretRepository.update()', async () => {
      expect(repositoryUpdateSpy).toHaveBeenCalled();
    });

    it('should call secretRepository.update() with a hash and the updated secret', async () => {
      expect(repositoryUpdateSpy).toHaveBeenCalledWith(
        secret.hashedSecretText,
        secret
      );
    });

    it('should not call secretRepository.remove() when remaining views is positive', async () => {
      expect(repositoryRemoveSpy).toHaveBeenCalledTimes(0);
    });

    it('should lower the remainingViews', async () => {
      expect(secret.remainingViews).toEqual(secretStub().remainingViews - 1);
    });
  });

  describe('when createSecret is called', () => {
    let repositoryCreateSpy: jest.SpyInstance;
    let rSecretMetaDto: ReadSecretMetaDto;
    let createSecretDto: CreateSecretDto;

    beforeEach(async () => {
      createSecretDto = new CreateSecretDto(
        secretStub().secretName,
        secretStub().secretText,
        secretStub().remainingViews
      );

      repositoryCreateSpy = jest.spyOn(secretRepository, 'create');
      rSecretMetaDto = await service.createSecret(createSecretDto);
    });

    it('should be defined', () => {
      expect(service.createSecret).toBeDefined();
    });

    it('should call secretRepository.create()', async () => {
      expect(repositoryCreateSpy).toHaveBeenCalled();
    });

    it('should return with a ReadSecretMetaDto', async () => {
      expect(rSecretMetaDto).toEqual(readSecretMetaDto())
    })
  });
});
