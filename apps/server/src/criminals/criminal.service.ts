import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Criminal } from './entities/criminal.entity';
import { CreateCriminalDto } from './dto/create-criminal.dto';

@Injectable()
export class CriminalService {
  constructor(@InjectModel(Criminal) private criminalModel: typeof Criminal) {}
  findAll() {
    // get all criminals persona non grata = false
    return this.criminalModel.findAll();
  }
  // get all personag non grata = true
  createCriminal(newCriminalDto: CreateCriminalDto) {
    return this.criminalModel.create(newCriminalDto);
  }
  // update criminal to persona non grata, and back to criminal
  updateCriminal(criminalToUpdate: CreateCriminalDto, id: string) {
    this.criminalModel.update(criminalToUpdate, {
      where: { id },
    });
  }
  deleteCriminal(id: string) {
    return this.criminalModel.destroy({ where: { id } });
  }
}
