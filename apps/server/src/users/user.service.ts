import { Injectable } from '@nestjs/common';
import { User } from './entites/user.entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { where } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  findAll() {
    return this.userModel.findAll();
  }

  findUserByUserId(id: string) {
    return this.userModel.findOne({ where: { id } });
  }
  createUser(newUserDto: CreateUserDto) {
    return this.userModel.create(newUserDto);
  }

  updateUser(userToUpdate: CreateUserDto, id: string) {
    return this.userModel.update(userToUpdate, {
      where: { id },
    });
  }

  deleteUser(id: string) {
    return this.userModel.destroy({ where: { id } });
  }
}
