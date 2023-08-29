import express from 'express';
import ClientController from './controller/client.controller.js';
import GraveDiggerController from './controller/grave-digger.controller.js';
import TumulusController from './controller/tumulus.controller.js';

export class App {
  app;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/clients', ClientController);
    this.app.use('/gravediggers', GraveDiggerController);
    this.app.use('/tumulus', TumulusController);
  }

  start(port) {
    this.app.listen(port, () => console.log('listening at port: ', port));
  }
}

export const application = new App();
export const { app } = application;
