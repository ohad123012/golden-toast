import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CriminalsModule } from '../criminals/criminals.module';
import { ToastsModule } from '../toasts/toasts.module';
import { ToastParticipantsModule } from '../toast-participants/toast-participants.module';

@Module({
  imports: [
    UsersModule,
    CriminalsModule,
    ToastsModule,
    ToastParticipantsModule,
  ],
  exports: [],
})
export class AppModule {}
