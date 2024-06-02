import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './db/data-source';
import { AuthModule } from './auth/auth.module';
import {PassportModule} from "@nestjs/passport";
import {GoogleStrategy} from "./auth/strategies/google.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PassportModule.register({ session: true }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
