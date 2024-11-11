import { Module } from '@nestjs/common';
import { CriminalService } from './criminal.service';
import { CriminalController } from './criminal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Criminal } from './entities/criminal.entity';

@Module({
  imports: [SequelizeModule.forFeature([Criminal])],
  controllers: [CriminalController],
  providers: [CriminalService],
  exports: [],
})
export class CriminalModule {}
