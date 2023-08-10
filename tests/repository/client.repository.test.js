import { describe, test, expect } from '@jest/globals';
import { validClient } from '../mocks/client.mocks';
import { ClientEntity } from '../../src/entity/client';
import { ClientRepository } from '../../src/repository/client.repository';
import connection from '../../src/database/mysql-connection';

describe('Client Repository - Unit Tests', () => {
  const repositoryClient = new ClientRepository(connection);
  let clientId = 0;
  test('should insert a new client in database', async () => {
    const client = new ClientEntity(validClient);
    const result = await repositoryClient.insert(client);
    expect(result).toBeTruthy()
    clientId = result
  });
  test('should find client in database', async () => {
    const client = await repositoryClient.findById(clientId)
    expect(client.id).toStrictEqual(clientId)
    expect(client.name).toStrictEqual('pedro malphite')
    expect(client.cpf).toStrictEqual(12345678910)
    expect(client.birthDate).toStrictEqual('2031-09-02')
    expect(client.nationality).toStrictEqual('Montanha')
    expect(client.gender).toStrictEqual('M')

  });
  test('should update client in database', async() =>{
    const clientUp = new ClientEntity({id: clientId, name: "let carrorson", cpf: 84578745612, birthDate:"1999-08-09", nationality: "Peruano", gender: "M"})
    const client = await repositoryClient.update(clientUp)
    expect(client.id).toStrictEqual(clientId)
    expect(client.name).toStrictEqual('let carrorson')
    expect(client.cpf).toStrictEqual(84578745612)
    expect(client.birthDate).toStrictEqual('1999-08-09')
    expect(client.nationality).toStrictEqual('Peruano')
    expect(client.gender).toStrictEqual('M')

  });

  test('should delete client in database', async () =>{
    await repositoryClient.delete(clientId)
  });

});