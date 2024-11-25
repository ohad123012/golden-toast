import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ToastService } from './toast.service';
import { CreateToastDto } from './dto/create-toast.dto';

@Controller('toast')
export class ToastController {
  constructor(private readonly toastService: ToastService) {}
  @Get()
  findAll() {
    return this.toastService.findAll();
  }

  @Get('past-toasts/:userId')
  getPastToastForUser(@Param('userId') userId: string) {
    return this.toastService.getPastToastForUser(userId);
  }

  @Get('all-past-toasts')
  getAllPastToasts() {
    return this.toastService.getAllPastToasts();
  }

  @Get('all-future-toasts')
  getAllFutureToasts() {
    return this.toastService.getAllFutureToasts();
  }

  @Get('amount-toasts-period')
  getAmountToastsForCurrentPeriod() {
    return this.toastService.getAmountToastsForCurrentPeriod();
  }

  @Get('all-time-record')
  getOldestToast() {
    return this.toastService.getAllTimeRecord();
  }

  @Get('amount-toasts-period-per-user')
  getAmountToastsForCurrentPeriodPerUser() {
    return this.toastService.getAmountToastsForCurrentPeriodPerUser();
  }

  @Post()
  createToast(@Body() newToastDto: CreateToastDto) {
    return this.toastService.createToast(newToastDto);
  }
  @Put('update-toast/:toastId')
  updateToast(
    @Body() toastToUpdate: CreateToastDto,
    @Param('toastId') toastId: string
  ) {
    return this.toastService.updateToast(toastToUpdate, toastId);
  }
  @Delete(':id')
  deleteToast(@Param('id') id: string) {
    return this.toastService.deleteToast(id);
  }
}
