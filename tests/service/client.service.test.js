import { describe, test, expect } from '@jest/globals';
import connection from '../../src/database/mysql-connection';
import { ClientRepository } from '../../src/repository/client.repository';
import { ClientService } from '../../src/service/client.service';
import { validClient } from '../mocks/client.mocks';
import { ClientEntity } from '../../src/entity/client';

describe('Client Service - Unit Tests', () => {
  const repository = new ClientRepository(connection);
  const service = new ClientService(repository);
  let client = {};
  test('should create a new client', async () => {
    const createdClient = await service.create(validClient);
    expect(createdClient.name).toEqual('pedro malphite');
    expect(createdClient.cpf).toEqual(12345678910);
    expect(createdClient.birth_date).toEqual(new Date('2031-09-02 00:00:000'));
    expect(createdClient.nationality).toEqual('Montanha');
    expect(createdClient.gender).toEqual('M');
    client = createdClient;
  });

  test('should return not found client', async () => {
    const { error, errorMessage } = await service.findById(0);
    expect(error).toBeTruthy();
    expect(errorMessage).toBe('client not found');
  });
  test('should update a client', async () => {
    const clientUp = new ClientEntity({
      name: 'let carrorson',
      cpf: 84578745612,
      birthDate: '1999-08-09',
      nationality: 'Peruano',
      gender: 'M',
    });
    const result = await service.update(client.id, clientUp);
    expect(result.id).toStrictEqual(client.id);
    expect(result.name).toStrictEqual('let carrorson');
    expect(result.cpf).toStrictEqual(84578745612);
    expect(result.birth_date).toStrictEqual(new Date('1999-08-09 00:00:000'));
    expect(result.nationality).toStrictEqual('Peruano');
    expect(result.gender).toStrictEqual('M');
    client = result;
  });

  test('should find all in client', async () => {
    const clients = await service.findAll();
    expect(clients).toEqual([
      {
        id: client.id,
        name: client.name,
        cpf: client.cpf,
        nationality: client.nationality,
        gender: client.gender,
        birth_date: client.birth_date,
      },
    ]);
  });

  test('should delete client MUAHAHAHA', async () => {
    const result = await service.delete(client.id);
    expect(result).toBeTruthy();
  });
});
