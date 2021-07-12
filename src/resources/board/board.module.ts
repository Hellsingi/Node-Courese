import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Guard } from '../../middlewares/login.guard';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from '../../entity/board.entity';
import TaskColumn from '../../entity/column.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([TaskColumn]),
    TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class boardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Guard)
      .forRoutes('boards');
  }
}
