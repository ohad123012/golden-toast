import { Controller } from '@nestjs/common';
import { ToastsService } from './toasts.service';

@Controller('toasts')
export class ToastsController {
  constructor(private readonly toastsService: ToastsService) {}
}
