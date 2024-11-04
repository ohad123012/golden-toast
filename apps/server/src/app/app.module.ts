import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CriminalsModule } from '../criminals/criminals.module';
import { ToastsModule } from '../toasts/toasts.module';

@Module({
  imports: [UsersModule, CriminalsModule, ToastsModule],
  exports: [],
})
export class AppModule {}
