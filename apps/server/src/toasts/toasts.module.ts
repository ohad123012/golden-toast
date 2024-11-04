import { Module } from '@nestjs/common';
import { ToastsService } from './toasts.service';
import { ToastsController } from './toasts.controller';
import { Toasts } from './entities/toasts.entities';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Toasts])],

  controllers: [ToastsController],
  providers: [ToastsService],
})
export class ToastsModule {}
