import { Module } from '@nestjs/common';
import { CriminalsService } from './criminals.service';
import { CriminalsController } from './criminals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Criminals } from './entities/criminal.entity';

@Module({
  imports: [SequelizeModule.forFeature([Criminals])],
  controllers: [CriminalsController],
  providers: [CriminalsService],
})
export class CriminalsModule {}
