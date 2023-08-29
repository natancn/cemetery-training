import connection from '../../database/mysql-connection.js';
import { TumulusService } from '../tumulus.service.js';
import { TumulusRepository } from '../../repository/tumulus.repository.js';
import { ClientRepository } from '../../repository/client.repository.js';
import { ClientService } from '../../service/client.service.js';
import { GraveDiggerRepository } from '../../repository/grave-digger.repository.js';
import { GraveDiggerService } from '../grave-digger.service.js';

export class TumulusServiceFactory {
  static getInstance() {
    const clientRepository = new ClientRepository(connection);
    const clientService = new ClientService(clientRepository);

    const graveDiggerRepository = new GraveDiggerRepository(connection);
    const graveDiggerService = new GraveDiggerService(graveDiggerRepository);

    const repository = new TumulusRepository(connection);
    const service = new TumulusService(
      repository,
      clientService,
      graveDiggerService,
    );

    return service;
  }
}
