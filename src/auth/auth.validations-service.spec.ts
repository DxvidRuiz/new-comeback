import { Test, TestingModule } from '@nestjs/testing';
import { ValidationsServiceService } from './auth.validations-service';

describe('ValidationsServiceService', () => {
  let service: ValidationsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationsServiceService],
    }).compile();

    service = module.get<ValidationsServiceService>(ValidationsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
