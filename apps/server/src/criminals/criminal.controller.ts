import { Controller, Get } from '@nestjs/common';
import { CriminalService } from './criminal.service';

@Controller('criminal')
export class CriminalController {
  constructor(private readonly criminalService: CriminalService) {}
  @Get()
  findAll() {
    console.log(this.criminalService.findAll());
    return this.criminalService.findAll();
  }
}
