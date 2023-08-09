import { describe, test, expect } from '@jest/globals';
import { validClient } from '../mocks/client.mocks';
import { ClientEntity } from '../../src/entity/client';
import connection from '../../src/database/mysql-connection';
import { ClientRepository } from '../../src/repository/client.repository';

describe('Client Repository - Unit Tests', () => {
  const repositoryClient = new ClientRepository(connection);
  test('should insert a new client in database', async () => {
    const client = new ClientEntity(validClient);
    const result = await repositoryClient.insert(client);

    expect(result).toBeTruthy()
  });
});