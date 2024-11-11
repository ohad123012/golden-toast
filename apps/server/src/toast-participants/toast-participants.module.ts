import { Module } from '@nestjs/common';
import { ToastParticipantsService } from './toast-participants.service';
import { ToastParticipantsController } from './toast-participants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ToastParticipants } from './entities/toast-participants.entity';

@Module({
  imports: [SequelizeModule.forFeature([ToastParticipants])],
  controllers: [ToastParticipantsController],
  providers: [ToastParticipantsService],
})
export class ToastParticipantsModule {}
