import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entites/user.entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { ToastParticipantsModule } from '../toast-participants/toast-participants.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), ToastParticipantsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
