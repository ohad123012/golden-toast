import { Controller } from '@nestjs/common';
import { ToastParticipantsService } from './toast-participants.service';

@Controller('toast-participants')
export class ToastParticipantsController {
  constructor(private readonly toastParticipantsService: ToastParticipantsService) {}
}
