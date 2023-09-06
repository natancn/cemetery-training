import { TombService } from '../tomb.service.js';
import { TombRepository } from '../../repository/tomb.repository.js';
import { CoffinRepository } from '../../repository/coffin.repository.js';
import { CoffinService } from '../coffin.service.js';
import { TumulusServiceFactory } from './tumulus.service.factory.js';

export class CoffinServiceFactory {
  static getInstance() {
    const tumulusService = TumulusServiceFactory.getInstance();
    const connection = tumulusService.repositoryTumulus.connection;
    const tombRepository = new TombRepository(connection);
    const tombService = new TombService(
      tombRepository,
      tumulusService.clientService,
    );
    const repository = new CoffinRepository(connection);
    const service = new CoffinService(repository, tumulusService, tombService);
    return service;
  }
}
