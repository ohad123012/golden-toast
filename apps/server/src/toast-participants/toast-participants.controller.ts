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

  @Get('allUsers/:toastId')
  findAllParticipantsForToastId(@Param('toastId') toastId: string) {
    return this.toastParticipantsService.findAllParticipantsForToastId(toastId);
  }
  @Post()
  createToastParticipant(
    @Body() newToastParticipant: CreateToastParticipantDto
  ) {
    return this.toastParticipantsService.createToastParticipant(
      newToastParticipant
    );
  }
  @Delete(':id')
  deleteToastParticipant(@Param('id') id: string) {
    return this.toastParticipantsService.deleteToastParticipant(id);
  }
}
