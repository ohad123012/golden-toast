import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ToastParticipantsService } from './toast-participants.service';
import { CreateToastParticipantDto } from './dto/create-toast-participant.dto';

@Controller('toast-participants')
export class ToastParticipantsController {
  constructor(
    private readonly toastParticipantsService: ToastParticipantsService
  ) {}
  @Get()
  findAll() {
    return this.toastParticipantsService.findAll();
  }

  @Get('/all-toasts-for-user/:userId')
  findAllToastsForUser(@Param('userId') userId: string) {
    return this.toastParticipantsService.findAllToastsForUser(userId);
  }

  @Post()
  createToastParticipants(
    @Body() newToastParticipants: CreateToastParticipantDto[]
  ) {
    return this.toastParticipantsService.createToastParticipants(
      newToastParticipants
    );
  }
  @Delete(':id')
  deleteToastParticipant(@Param('id') id: string) {
    return this.toastParticipantsService.deleteToastParticipant(id);
  }

  @Delete('/by-user-toast/:toastId/:userId')
  deleteToastParticipantByToastIdAndUserId(
    @Param('toastId') toastId: string,
    @Param('userId') userId: string
  ) {
    return this.toastParticipantsService.deleteToastParticipantByToastIdAndUserId(
      toastId,
      userId
    );
  }
  @Delete('for-toast-id/:toastId')
  deleteAllToastParticipantsForToastId(@Param('toastId') toastId: string) {
    return this.toastParticipantsService.deleteAllToastParticipantsForToastId(
      toastId
    );
  }
}
