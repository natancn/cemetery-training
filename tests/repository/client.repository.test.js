import { describe, test, expect } from '@jest/globals';
import { validClient } from '../mocks/client.mocks';
import { ClientEntity } from '../../src/entity/client';
import { ClientRepository } from '../../src/repository/client.repository';
import connection from '../../src/database/mysql-connection.js';

describe('Client Repository - Unit Tests', () => {
  const repositoryClient = new ClientRepository(connection);
    test('should insert a new client in database', async () => {
    const client = new ClientEntity(validClient);
    const result = await repositoryClient.insert(client);
    console.log('here')
    expect(result).toBeTruthy()
  });
});