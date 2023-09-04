import connection from '../../database/mysql-connection.js';
import { ClientService } from '../../service/client.service.js';
import { ClientRepository } from '../../repository/client.repository.js';
import { TombService } from '../tomb.service.js';
import { TombRepository } from '../../repository/tomb.repository.js';

export class TombServiceFactory {
  static getInstance() {
    const clientRepository = new ClientRepository(connection);
    const clientService = new ClientService(clientRepository);

    const repository = new TombRepository(connection);
    const service = new TombService(repository, clientService);
    return service;
  }
}
