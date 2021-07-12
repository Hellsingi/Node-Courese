import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'dotenv';
import fetch from 'node-fetch';
import { AllExceptionsFilter } from './middlewares/error-handler';
import {  NestExpressApplication } from '@nestjs/platform-express';
import {  NestFastifyApplication } from '@nestjs/platform-fastify';

config.config();

async function bootstrap() {
  let app;
  if (process.env['USE_FASTIFY'] ==='true') {
    app = await NestFactory.create<NestFastifyApplication>(AppModule);
  } else {
    app = await NestFactory.create<NestExpressApplication>(AppModule)
  }
  await app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(Number(process.env['PORT']));
  fetch(`http://localhost:${process.env['PORT']}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: 'admin',
      name: 'admin',
      password: 'admin',
      secretPass: process.env['JWT_SECRET_KEY']
    })
  }).then(res => res.json()).then((data) => {
    if (data.exists) {
      console.log('Admin was exist');
    } else {
      console.log('Admin was created');
    }
  }).catch(err => {
    console.log(err.message);
  });
}

bootstrap();
