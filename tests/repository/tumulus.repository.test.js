import { describe, test, expect } from '@jest/globals';
import { validClient, validTumulus } from '../mocks/client.mocks';
import { tumulusEntity } from '../../src/entity/tumulus';
import { TumulusRepository } from '../../src/repository/tumulus.repository';
import connection from '../../src/database/mysql-connection';
import { validGraveDigger } from '../mocks/grave-digger.mocks';

describe('Tumulus Repository - Unit Tests',()=>{
  const repositoryTumulus = new TumulusRepository(connection);
  let tumulusId = 0;

  test('should insert a new tumulus in database', async()=>{
    const tumulus = new tumulusEntity(validTumulus);
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
    const tumulusUp = new tumulusEntity({id: tumulusId, deepness: 5, location: 12, tombstone: 'Ivory'})
    const result = await repositoryTumulus.update(tumulusUp)
    const tumulus = await repositoryTumulus.findById(tumulusId)
    expect(result).toBeTruthy()
    expect(tumulus.id).toStrictEqual(tumulusId)
    expect(tumulus.deepness).toStrictEqual(tumulusUp.deepness)
    expect(tumulus.tombstone).toStrictEqual(tumulusUp.tombstone)
  });
  test('should delete tumulus in database', async()=>{
    await repositoryTumulus.delete(tumulusId)
  })
})