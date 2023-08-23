import { ClientEntity } from '../../src/entity/client';
import { validClient } from './client.mocks';

export const validTomb = {
  id: 1,
  floors: 2,
  haunted: 'Y',
  size: 8,
  location: 2.3,
  client: new ClientEntity(validClient),
};
