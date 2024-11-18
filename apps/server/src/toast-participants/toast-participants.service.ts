import { Injectable } from '@nestjs/common';
import { ToastParticipants } from './entities/toast-participants.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToastParticipantDto } from './dto/create-toast-participant.dto';

@Injectable()
export class ToastParticipantsService {
  constructor(
    @InjectModel(ToastParticipants)
    private toastParticipantsModel: typeof ToastParticipants
  ) {}
  findAll() {
    return this.toastParticipantsModel.findAll();
  }

  findAllParticipantsForToastId(toastId: string) {
    return this.toastParticipantsModel.findAll({
      where: { toastId: toastId },
      attributes: ['userId'],
    });
  }

  createToastParticipant(newToastParticipantDto: CreateToastParticipantDto) {
    return this.toastParticipantsModel.create(newToastParticipantDto);
  }

  deleteToastParticipant(id: string) {
    return this.toastParticipantsModel.destroy({ where: { id } });
  }
}
