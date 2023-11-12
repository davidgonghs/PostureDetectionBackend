import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';
import { UserLogModule } from './user-log/user-log.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DATABASE,
      ssl: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SongModule,
    UserModule,
    UserLogModule,
    AdminModule,
    AuthModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
