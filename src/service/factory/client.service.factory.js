import connection from '../../database/mysql-connection.js';
import { ClientRepository } from '../../repository/client.repository.js';
import { ClientService } from '../../service/client.service.js';

export class ClientServiceFactory {
  static getInstance() {
    const repository = new ClientRepository(connection);
    const service = new ClientService(repository);
    return service;
  }
}
