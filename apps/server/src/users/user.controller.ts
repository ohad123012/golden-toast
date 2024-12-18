import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('get-user/:userId')
  findUserByUserId(@Param('userId') userId: string) {
    return this.userService.findUserByUserId(userId);
  }
  @Post()
  createUser(@Body() newUserDto: CreateUserDto) {
    return this.userService.createUser(newUserDto);
  }

  @Put('update-user/:userId')
  updateUser(
    @Body() userToUpdate: CreateUserDto,
    @Param('userId') userId: string
  ) {
    return this.userService.updateUser(userToUpdate, userId);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
