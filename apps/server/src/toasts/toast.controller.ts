import { Controller, Get } from '@nestjs/common';
import { ToastService } from './toast.service';

@Controller('toast')
export class ToastController {
  constructor(private readonly toastService: ToastService) {}
  @Get()
  findAll() {
    return this.toastService.findAll();
  }
}
