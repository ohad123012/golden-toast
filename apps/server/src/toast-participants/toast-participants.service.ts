import { Injectable } from '@nestjs/common';
import { ToastParticipants } from './entities/toast-participants.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToastParticipantDto } from './dto/create-toast-participant.dto';
import { ToastService } from '../toasts/toast.service';

@Injectable()
export class ToastParticipantsService {
  constructor(
    @InjectModel(ToastParticipants)
    private toastParticipantsModel: typeof ToastParticipants
  ) {}
  findAll() {
    return this.toastParticipantsModel.findAll();
  }

  findAllToastsForUser(userId: string) {
    return this.toastParticipantsModel.findAll({
      where: {
        userId,
      },
      attributes: ['toastId'],
    });
  }

  findAllParticipantsForToastId(toastId: string) {
    return this.toastParticipantsModel.findAll({
      where: { toastId: toastId },
      attributes: ['userId'],
    });
  }

  createToastParticipants(
    newToastParticipantsDto: CreateToastParticipantDto[]
  ) {
    return this.toastParticipantsModel.bulkCreate(newToastParticipantsDto);
  }

  deleteToastParticipant(id: string) {
    return this.toastParticipantsModel.destroy({ where: { id } });
  }

  deleteAllToastParticipantsForToastId(toastId: string) {
    return this.toastParticipantsModel.destroy({ where: { toastId } });
  }
}
