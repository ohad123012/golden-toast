import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { CriminalModule } from '../criminals/criminal.module';
import { ToastModule } from '../toasts/toast.module';
import { ToastParticipantsModule } from '../toast-participants/toast-participants.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.NX_DB_HOST,
      port: +(process.env.NX_DB_PORT ?? 5432), // port ? port : 5432
      username: process.env.NX_DB_CREDENTIALS,
      password: process.env.NX_DB_CREDENTIALS,
      database: 'trunk-management',
      autoLoadModels: true,
      synchronize: true,
      define: { schema: 'golden-toast', paranoid: false },
    }),
    UserModule,
    CriminalModule,
    ToastModule,
    ToastParticipantsModule,
  ],
  exports: [],
})
export class AppModule {}
