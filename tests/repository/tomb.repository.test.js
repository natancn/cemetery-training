import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { TombEntity } from '../../src/entity/tomb';
import { TombRepository } from '../../src/repository/tomb.repository';
import { validTomb } from "../mocks/tomb.mock";
import connection from '../../src/database/mysql-connection';
import { ClientEntity } from "../../src/entity/client";
import { ClientRepository } from "../../src/repository/client.repository";
import { validClient } from "../mocks/client.mocks";

describe('Tomb Repository - Unit Tests', ()=>{
  let client = validClient;
  const repositoryClient = new ClientRepository(connection);

  const repositoryTomb = new TombRepository(connection);
  let tombId = 0;

  beforeAll(async()=>{
    const _client = new ClientEntity(validClient)
    const result = await repositoryClient.insert(_client)
    client.id = result
  });
  afterAll(async()=>{
    await repositoryClient.delete(client.id)
  });
  test('should insert a new tomb in database', async()=>{
    const tombMock = {...validTomb, client }
    const tomb = new TombEntity(tombMock);
    const result = await repositoryTomb.insert(tomb);
    expect(result).toBeTruthy()
    tombId = result
  });
  test('should find a tomb in database', async()=>{
    const tomb = await repositoryTomb.findById(tombId)
    expect(tomb.id).toStrictEqual(tombId)
    expect(tomb.floors).toStrictEqual(2)
    expect(tomb.haunted).toStrictEqual('Y')
    expect(tomb.size).toStrictEqual(8)
    expect(parseFloat(tomb.location)).toStrictEqual(2.3)
    
  });
  test('should update tomb in database',async()=>{
    const tombUp = new TombEntity({id: tombId,floors:3,haunted:'N',size:9,location:3.4,client})
    const result = await repositoryTomb.update(tombUp)
    const tomb = await repositoryTomb.findById(tombId)
    expect(result).toBeTruthy()
    expect(tomb.id).toStrictEqual(tombId)
    expect(tomb.floors).toStrictEqual(tombUp.floors)
    expect(tomb.haunted).toStrictEqual(tombUp.haunted)
    expect(tomb.size).toStrictEqual(tombUp.size)
    expect(parseFloat(tomb.location)).toStrictEqual(tombUp.location)
  });
  test('should delete tomb in database', async()=>{
    await repositoryTomb.delete(tombId)
  });
})