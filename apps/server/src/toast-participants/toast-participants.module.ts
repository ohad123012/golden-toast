import { Module } from '@nestjs/common';
import { ToastParticipantsService } from './toast-participants.service';
import { ToastParticipantsController } from './toast-participants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ToastParticipants } from './entities/toast-participants.entity';
import { ToastModule } from '../toasts/toast.module';
import { ToastService } from '../toasts/toast.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [SequelizeModule.forFeature([ToastParticipants])],
  controllers: [ToastParticipantsController],
  providers: [ToastParticipantsService],
  exports: [ToastParticipantsModule],
})
export class ToastParticipantsModule {}
