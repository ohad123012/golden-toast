import { Injectable } from '@nestjs/common';
import { User } from './entites/user.entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  findAll() {
    return this.userModel.findAll();
  }

  createUser(newUserDto: CreateUserDto) {
    return this.userModel.create(newUserDto);
  }
}
