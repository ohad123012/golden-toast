import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriminalService } from './criminal.service';
import { CreateCriminalDto } from './dto/create-criminal.dto';

@Controller('criminal')
export class CriminalController {
  constructor(private readonly criminalService: CriminalService) {}
  @Get()
  findAll() {
    return this.criminalService.findAll();
  }

  @Get('get-criminals')
  getAllCriminals() {
    return this.criminalService.getAllCriminals();
  }

  @Get('get-persona-non-grata')
  getAllPersonaNonGrata() {
    return this.criminalService.getAllPersonaNonGrata();
  }

  @Post()
  createCriminal(@Body() newCriminalDto: CreateCriminalDto) {
    return this.criminalService.createCriminal(newCriminalDto);
  }
  @Put('update-criminal/:criminalId')
  updateCriminal(
    @Body() criminalToUpdate: CreateCriminalDto,
    @Param('criminalId') criminalId: string
  ) {
    this.criminalService.updateCriminal(criminalToUpdate, criminalId);
  }

  @Delete(':id')
  deleteCriminal(@Param('id') id: string) {
    return this.criminalService.deleteCriminal(id);
  }
}
