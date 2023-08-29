import connection from '../../database/mysql-connection.js';
import { GraveDiggerRepository } from '../../repository/grave-digger.repository.js';
import { GraveDiggerService } from '../grave-digger.service.js';

export class GraveDiggerFactory {
  static getInstance() {
    const repository = new GraveDiggerRepository(connection);
    const service = new GraveDiggerService(repository);
    return service;
  }
}
