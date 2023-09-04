import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { validTomb } from '../mocks/tomb.mock';
import { validClient } from '../mocks/client.mocks';
import { TombServiceFactory } from '../../src/service/factory/tomb.service.factory';
import { TombEntity } from '../../src/entity/tomb';

describe('Tomb Service - Unit Tests', () => {
  const service = TombServiceFactory.getInstance();
  let tomb = {};
  let client = {};

  beforeAll(async () => {
    const _client = await service.clientService.create(validClient);
    client = _client;
  });
  afterAll(async () => {
    await service.clientService.delete(client.id);
  });

  test('should create a new tomb', async () => {
    const tombMock = { ...validTomb, client };
    const createdTomb = await service.create(tombMock);
    expect(createdTomb.floors).toEqual(2);
    expect(createdTomb.haunted).toEqual('Y');
    expect(Number(createdTomb.location)).toEqual(2.3);
    expect(createdTomb.size).toEqual(8);
    tomb = createdTomb;
  });
  test('should return not found tomb', async () => {
    const { error, errorMessage } = await service.findById(0);
    expect(error).toBeTruthy();
    expect(errorMessage).toBe('tomb not found');
  });
  test('should find tomb in database', async () => {
    const foundTomb = await service.findById(tomb.id);
    expect(foundTomb).toEqual({
      id: tomb.id,
      floors: tomb.floors,
      haunted: tomb.haunted,
      location: tomb.location,
      size: tomb.size,
      client,
    });
  });
  test('should find all in tomb', async () => {
    const tombs = await service.findAll();
    expect(tombs).toEqual([
      {
        id: tomb.id,
        floors: tomb.floors,
        haunted: tomb.haunted,
        location: tomb.location,
        size: tomb.size,
        client,
      },
    ]);
  });
  test('should update tomb', async () => {
    const tombUpdate = new TombEntity({
      floors: 4,
      haunted: 'N',
      location: 3.1,
      size: 3,
      client,
    });
    const result = await service.update(tomb.id, tombUpdate);
    expect(result.id).toStrictEqual(tomb.id);
    expect(result.floors).toStrictEqual(4);
    expect(result.haunted).toStrictEqual('N');
    expect(Number(result.location)).toStrictEqual(3.1);
    expect(result.size).toStrictEqual(3);
    tomb = result;
  });
  test('should delete tomb', async () => {
    const result = await service.delete(tomb.id);
    expect(result).toBeTruthy();
  });
});
