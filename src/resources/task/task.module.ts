import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { Guard } from '../../middlewares/login.guard';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import Task from '../../entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class taskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Guard)
      .forRoutes('boards/:boardId/tasks/');
  }
}
