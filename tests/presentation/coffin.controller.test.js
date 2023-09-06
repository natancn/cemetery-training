import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../src/presentation/app';
import request from 'supertest';
import { validTumulus } from '../mocks/tumulus.mock';
import { validTomb } from '../mocks/tomb.mock';
import { validCoffin } from '../mocks/coffin.mocks';
import { validClient } from '../mocks/client.mocks';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import { CoffinServiceFactory } from '../../src/service/factory/coffin.service.factory';

describe('Coffin controller - Unit Tests', () => {
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
  test('GET coffin/ - should return empty', async () => {
    await request(app).get('/coffin').expect(200, []);
  });
  test('POST coffin/ - should create a new coffin', async () => {
    const { body } = await request(app)
      .post('/coffin')
      .send({ ...validCoffin, client, gravedigger, tomb, tumulus })
      .expect(201);
    expect(body.id).toBeDefined();
    expect(body.material).toBe(validCoffin.material);
    expect(body.size).toBe(validCoffin.size);
    expect(body.location).toBe(validCoffin.location);
    coffin = body;
  });
  test('GET coffin/:id - should return the created coffin', async () => {
    await request(app).get(`/coffin/${coffin.id}`).expect(200, coffin);
  });
  test('PUT coffin/:id - should update the coffin', async () => {
    const updateCoffin = {
      material: 'Carvalho',
      size: 'S',
      location: 9.8,
      tomb_id: tomb.id,
      tumulus_id: tumulus.id,
    };
    await request(app)
      .put(`/coffin/${coffin.id}`)
      .send(updateCoffin)
      .expect(200, {
        id: coffin.id,
        material: updateCoffin.material,
        location: updateCoffin.location,
        size: updateCoffin.size,
        tomb: {
          ...tomb,
          client: {
            ...tomb.client,
            birth_date: tomb.client.birth_date.toISOString(),
          },
        },
        tumulus: {
          ...tumulus,
          client: {
            ...client,
            birth_date: tumulus.client.birth_date.toISOString(),
          },
          graveDigger: {
            ...gravedigger,
            birth_date: tumulus.graveDigger.birth_date.toISOString(),
          },
        },
      });
  });
  test('DELETE coffin/:id - should delete the coffin', async () => {
    await request(app).delete(`/coffin/${coffin.id}`).expect(200);
  });
});
