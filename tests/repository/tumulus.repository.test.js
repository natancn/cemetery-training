import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { validClient } from '../mocks/client.mocks';
import { TumulusEntity } from '../../src/entity/tumulus';
import { TumulusRepository } from '../../src/repository/tumulus.repository';
import connection from '../../src/database/mysql-connection';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import {GraveDiggerEntity} from '../../src/entity/grave-digger'
import {ClientEntity} from '../../src/entity/client'
import { ClientRepository } from '../../src/repository/client.repository';
import { GraveDiggerRepository } from '../../src/repository/grave-digger.repository';
import{validTumulus} from '../mocks/tumulus.mock'
describe('Tumulus Repository - Unit Tests',()=>{
  let client = validClient

  const repositoryClient = new ClientRepository(connection);

  const repositoryTumulus = new TumulusRepository(connection);
  let tumulusId = 0;
 
  const repositoryGraveDigger = new GraveDiggerRepository(connection);
  let gravedigger = validGraveDigger;
  
  beforeAll(async()=>{
    const _client = new ClientEntity(validClient)
    const result = await repositoryClient.insert(_client)
    client.id = result

    const _graveDigger = new GraveDiggerEntity(validGraveDigger)
    const result2 = await repositoryGraveDigger.insert(_graveDigger);
    gravedigger.id = result2


  });
  afterAll(async()=>{
    await repositoryClient.delete(client.id)
    await repositoryGraveDigger.delete(gravedigger.id)
    
    //deletar o cliente e o coveiro 
  });
  
  test('should insert a new tumulus in database', async()=>{
    const tumulusMock = {...validTumulus,client,gravedigger}
    const tumulus = new TumulusEntity(tumulusMock);
    const result = await repositoryTumulus.insert(tumulus);
    expect(result).toBeTruthy()
    tumulusId = result
  });
  test('should find a tumulus in database', async()=>{
    const tumulus = await repositoryTumulus.findById(tumulusId)
    expect(tumulus.id).toStrictEqual(tumulusId)
    expect(tumulus.deepness).toStrictEqual(-3)
    expect(tumulus.location).toStrictEqual(2)
    expect(tumulus.tombstone).toStrictEqual('Wood')

  });
  test('should update tumulus in database', async()=>{
    const tumulusUp = new TumulusEntity({id: tumulusId, deepness: -5, location: 12, tombstone: 'Ivory', gravedigger, client})
    const result = await repositoryTumulus.update(tumulusUp)
    const tumulus = await repositoryTumulus.findById(tumulusId)
    expect(result).toBeTruthy()
    expect(tumulus.id).toStrictEqual(tumulusId)
    expect(tumulus.deepness).toStrictEqual(tumulusUp.deepness)
    expect(tumulus.tombstone).toStrictEqual(tumulusUp.tombstone)

  });
  test('should delete tumulus in database', async()=>{
    await repositoryTumulus.delete(tumulusId)
  });
})