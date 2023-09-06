import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { validTumulus } from '../mocks/tumulus.mock';
import { validTomb } from '../mocks/tomb.mock';
import { validCoffin } from '../mocks/coffin.mocks';
import { validClient } from '../mocks/client.mocks';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import { CoffinServiceFactory } from '../../src/service/factory/coffin.service.factory';
import { CoffinEntity } from '../../src/entity/coffin';

describe('Coffin Service - Unit Tests', () => {
  const service = CoffinServiceFactory.getInstance();
  const tumulusService = service.tumulusService;
  const clientService = tumulusService.clientService;
  const graveDiggerService = tumulusService.graveDiggerService;
  const tombService = service.tombService;

  let tomb = {};
  let client = {};
  let gravedigger = {};
  let tumulus = {};
  let coffin = {};

  beforeAll(async () => {
    const _client = await clientService.create(validClient);
    client = _client;
    const _graveDigger = await graveDiggerService.create(validGraveDigger);
    gravedigger = _graveDigger;
    const _tumulus = await tumulusService.create({
      ...validTumulus,
      client,
      gravedigger,
    });
    tumulus = _tumulus;
    const _tomb = await tombService.create({ ...validTomb, client });
    tomb = _tomb;
  });

  afterAll(async () => {
    await tombService.delete(tomb.id);
    await tumulusService.delete(tumulus.id);
    await clientService.delete(client.id);
    await graveDiggerService.delete(gravedigger.id);
  });
  test('should create a new coffin', async () => {
    const coffinMock = { ...validCoffin, tomb, tumulus };
    const createdCoffin = await service.create(coffinMock);
    expect(createdCoffin.material).toEqual('Carvalho');
    expect(createdCoffin.size).toEqual('M');
    expect(createdCoffin.location).toEqual(2.3);
    coffin = createdCoffin;
  });
  test('should return not found coffin', async () => {
    const { error, errorMessage } = await service.findById(0);
    expect(error).toBeTruthy();
    expect(errorMessage).toBe('coffin not found');
  });
  test('should find coffin in database', async () => {
    const foundCoffin = await service.findById(coffin.id);
    expect(foundCoffin).toEqual({
      id: coffin.id,
      material: coffin.material,
      size: coffin.size,
      location: coffin.location,
      tomb,
      tumulus,
    });
  });
  test('should find all in coffin', async () => {
    const coffins = await service.findAll();
    expect(coffins).toEqual([
      {
        id: coffin.id,
        material: coffin.material,
        size: coffin.size,
        location: coffin.location,
        tomb,
        tumulus,
      },
    ]);
  });
  test('should update coffin', async () => {
    const coffinUpdate = new CoffinEntity({
      material: 'Pinho',
      size: 'B',
      location: 9.9,
      tomb,
      tumulus,
    });
    const result = await service.update(coffin.id, coffinUpdate);
    expect(result.id).toStrictEqual(coffin.id);
    expect(result.material).toStrictEqual('Pinho');
    expect(result.size).toStrictEqual('B');
    expect(result.location).toStrictEqual(9.9);
    coffin = result;
  });
  test('should delete coffin', async () => {
    const result = await service.delete(coffin.id);
    expect(result).toBeTruthy();
  });
});
