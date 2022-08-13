import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Secret } from '../schemas/secret.schema';
import { SecretRepository } from '../secret.repository';

describe('SecretRepository', () => {
  let repository: SecretRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretRepository,
        {
          provide: getModelToken(Secret.name),
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<SecretRepository>(SecretRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
