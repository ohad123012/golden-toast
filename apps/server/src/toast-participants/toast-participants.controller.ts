import { Controller, Get } from '@nestjs/common';
import { ToastParticipantsService } from './toast-participants.service';

@Controller('toast-participants')
export class ToastParticipantsController {
  constructor(
    private readonly toastParticipantsService: ToastParticipantsService
  ) {}
  @Get()
  findAll() {
    return this.toastParticipantsService.findAll();
  }
}
