import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { validCoffin } from '../mocks/coffin.mocks';
import { CoffinRepository } from "../../src/repository/coffin.repository";
import { CoffinEntity } from '../../src/entity/coffin';
import { TombEntity } from '../../src/entity/tomb';
import { TombRepository } from '../../src/repository/tomb.repository';
import { validTomb } from '../mocks/tomb.mock';
import { TumulusEntity } from '../../src/entity/tumulus';
import { validTumulus } from '../mocks/tumulus.mock';
import { TumulusRepository } from '../../src/repository/tumulus.repository';
import connection from '../../src/database/mysql-connection';
import { validClient } from '../mocks/client.mocks';
import { ClientEntity } from '../../src/entity/client';
import { ClientRepository } from '../../src/repository/client.repository';
import { GraveDiggerRepository } from '../../src/repository/grave-digger.repository';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import {GraveDiggerEntity} from '../../src/entity/grave-digger'

describe('Coffin Repository - Unit Tests',()=>{
  let client = validClient
  const repositoryClient = new ClientRepository(connection);
  
  let tomb = validTomb
  const repositoryTomb = new TombRepository(connection);

  let tumulus = validTumulus
  const repositoryTumulus = new TumulusRepository(connection);

  let gravedigger = validGraveDigger;
  const repositoryGraveDigger = new GraveDiggerRepository(connection);

  const repositoryCoffin = new CoffinRepository(connection);
  let coffinId = 0;

  beforeAll(async()=>{
    const _client = new ClientEntity(validClient)
    const result = await repositoryClient.insert(_client)
    _client.id = result

    const tombMock = {...validTomb, client:_client}
    const _tomb = new TombEntity(tombMock)
    const result1 = await repositoryTomb.insert(_tomb)
    tomb.id = result1

    const _graveDigger = new GraveDiggerEntity(validGraveDigger)
    const result2 = await repositoryGraveDigger.insert(_graveDigger);
    gravedigger.id = result2

    const tumulusMock = {...validTumulus, client: _client, gravedigger}
    const _tumulus = new TumulusEntity(tumulusMock)
    const result3 = await repositoryTumulus.insert(_tumulus)
    tumulus.id = result3
  });

  afterAll(async()=>{
    await repositoryClient.delete(client.id)
    await repositoryTumulus.delete(tumulus.id)
    await repositoryTomb.delete(tomb.id)
  })

  test('should insert a new coffin in database', async()=>{
    const coffinMock = {...validCoffin, tomb, tumulus}
    const coffin = new CoffinEntity(coffinMock)
    const result = await repositoryCoffin.insert(coffin)
    expect(result).toBeTruthy()
    coffinId = result
  });
  test('should find a coffin in database', async()=>{
    const coffin = await repositoryCoffin.findById(coffinId)
    expect(coffin.id).toStrictEqual(coffinId)
    expect(coffin.material).toStrictEqual('Carvalho')
    expect(coffin.size).toStrictEqual('M')
    expect(parseFloat(coffin.location)).toStrictEqual(2.3)
  });
  test('should update coffin in database',async()=>{
    const coffinUp = new CoffinEntity({id:coffinId,material:'Pinho',size:'S',location:8.1,tomb,tumulus})
    const result = await repositoryCoffin.update(coffinUp)
    const coffin = await repositoryCoffin.findById(coffinId)
    expect(result).toBeTruthy()
    expect(coffin.id).toStrictEqual(coffinId)
    expect(coffin.material).toStrictEqual(coffinUp.material)
    expect(coffin.size).toStrictEqual(coffinUp.size)
    expect(parseFloat(coffin.location)).toStrictEqual(coffinUp.location)

  });

  test('should delete coffin in database', async()=>{
    await repositoryCoffin.delete(coffinId)
  });

})