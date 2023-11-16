import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    // Enable CORS for specific origins
    // nestApp.use(cors({
    //   origin: '*',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   preflightContinue: false,
    //   optionsSuccessStatus: 204,
    //   credentials: true,
    // }));
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
