import { Injectable } from '@nestjs/common';
import { Toast } from './entities/toast.entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToastDto } from './dto/create-toast.dto';

@Injectable()
export class ToastService {
  constructor(@InjectModel(Toast) private toastModel: typeof Toast) {}
  findAll() {
    return this.toastModel.findAll();
  }

  createToast(newToastDto: CreateToastDto) {
    return this.toastModel.create(newToastDto);
  }
}
