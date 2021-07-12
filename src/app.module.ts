import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { boardModule } from './resources/board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { taskModule } from './resources/task/task.module';
import { UserModule } from './resources/users/user.module';
import { LoginModule } from './resources/login/login.module';
import { LoggerMiddleware } from './middlewares/logger';
import { getConnectionOptions } from 'typeorm';


@Module({
  imports: [boardModule,
    taskModule,
    UserModule,
    LoginModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
