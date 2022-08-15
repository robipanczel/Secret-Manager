import { Test, TestingModule } from '@nestjs/testing';
import { SecretRepository } from '../secret.repository';
import { SecretService } from '../secret.service';

describe('SecretService', () => {
  let service: SecretService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretService,
        {
          provide: SecretRepository,
          useFactory: () => ({
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<SecretService>(SecretService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
