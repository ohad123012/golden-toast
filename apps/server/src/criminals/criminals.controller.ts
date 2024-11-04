import { Controller } from '@nestjs/common';
import { CriminalsService } from './criminals.service';

@Controller('criminals')
export class CriminalsController {
  constructor(private readonly criminalsService: CriminalsService) {}
}
