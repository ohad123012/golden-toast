import { Module } from '@nestjs/common';
import { ToastParticipantsService } from './toast-participants.service';
import { ToastParticipantsController } from './toast-participants.controller';

@Module({
  controllers: [ToastParticipantsController],
  providers: [ToastParticipantsService],
})
export class ToastParticipantsModule {}
