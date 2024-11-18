import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Criminal } from './entities/criminal.entity';
import { CreateCriminalDto } from './dto/create-criminal.dto';

@Injectable()
export class CriminalService {
  constructor(@InjectModel(Criminal) private criminalModel: typeof Criminal) {}
  findAll() {
    return this.criminalModel.findAll();
  }
  createCriminal(newCriminalDto: CreateCriminalDto) {
    return this.criminalModel.create(newCriminalDto);
  }
  updateCriminal(criminalToUpdate: CreateCriminalDto, id: string) {
    this.criminalModel.update(criminalToUpdate, {
      where: { id },
    });
  }
  deleteCriminal(id: string) {
    return this.criminalModel.destroy({ where: { id } });
  }
}
