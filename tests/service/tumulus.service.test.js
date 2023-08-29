import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { validTumulus } from '../mocks/tumulus.mock';
import { validClient } from '../mocks/client.mocks';
import { TumulusServiceFactory } from '../../src/service/factory/tumulus.service.factory';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import { TumulusEntity } from '../../src/entity/tumulus';

describe('Tumulus Service - Unit Tests', () => {
  const service = TumulusServiceFactory.getInstance();
  let tumulus = {};
  let client = {};
  let gravedigger = {};

  beforeAll(async () => {
    const _client = await service.clientService.create(validClient);
    client = _client;
    const _graveDigger =
      await service.graveDiggerService.create(validGraveDigger);
    gravedigger = _graveDigger;
  });
  afterAll(async () => {
    await service.clientService.delete(client.id);
    await service.graveDiggerService.delete(gravedigger.id);
  });

  test('should create a new tumulus', async () => {
    const tumulusMock = { ...validTumulus, client, gravedigger };
    const createdTumulus = await service.create(tumulusMock);
    expect(createdTumulus.deepness).toEqual(-3);
    expect(createdTumulus.location).toEqual(2);
    expect(createdTumulus.tombstone).toEqual('Wood');
    tumulus = createdTumulus;
  });

  test('should return not found tumulus', async () => {
    const { error, errorMessage } = await service.findById(0);
    expect(error).toBeTruthy();
    expect(errorMessage).toBe('tumulus not found');
  });
  test('should find tumulus in database', async () => {
    const foundTumulus = await service.findById(tumulus.id);
    expect(foundTumulus).toEqual({
      id: tumulus.id,
      deepness: tumulus.deepness,
      location: tumulus.location,
      tombstone: tumulus.tombstone,
      client,
      graveDigger: gravedigger,
    });
  });
  test('should find all in tumulus', async () => {
    const tumuluss = await service.findAll();
    expect(tumuluss).toEqual([
      {
        id: tumulus.id,
        deepness: tumulus.deepness,
        location: tumulus.location,
        tombstone: tumulus.tombstone,
        client,
        graveDigger: gravedigger,
      },
    ]);
  });
  test('should update tumulus', async () => {
    const tumulusUpdate = new TumulusEntity({
      deepness: -8,
      location: 8,
      tombstone: 'Ivory',
      client,
      gravedigger,
    });
    const result = await service.update(tumulus.id, tumulusUpdate);
    expect(result.id).toStrictEqual(tumulus.id);
    expect(result.deepness).toStrictEqual(-8);
    expect(result.location).toStrictEqual(8);
    expect(result.tombstone).toStrictEqual('Ivory');
    tumulus = result;
  });
  test('should delete tumulus', async () => {
    const result = await service.delete(tumulus.id);
    expect(result).toBeTruthy();
  });
});
