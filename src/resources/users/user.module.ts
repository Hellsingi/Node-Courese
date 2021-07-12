import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Guard } from '../../middlewares/login.guard';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Guard)
      .forRoutes('users');
  }
}
