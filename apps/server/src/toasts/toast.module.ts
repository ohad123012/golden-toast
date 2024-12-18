import { Module } from '@nestjs/common';
import { ToastService } from './toast.service';
import { ToastController } from './toast.controller';
import { Toast } from './entities/toast.entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { ToastParticipantsModule } from '../toast-participants/toast-participants.module';

@Module({
  imports: [SequelizeModule.forFeature([Toast]), ToastParticipantsModule],

  controllers: [ToastController],
  providers: [ToastService],
})
export class ToastModule {}
