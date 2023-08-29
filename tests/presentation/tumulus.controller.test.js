import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../src/presentation/app';
import { validTumulus } from '../mocks/tumulus.mock';
import { validClient } from '../mocks/client.mocks';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import request from 'supertest';
import { GraveDiggerFactory } from '../../src/service/factory/grave-digger.service.factory';
import { ClientServiceFactory } from '../../src/service/factory/client.service.factory';

describe('Tumulus controller - Unit Tests', () => {
  let tumulus = {};
  let graveDiggerService = GraveDiggerFactory.getInstance();
  let clientService = ClientServiceFactory.getInstance();
  let gravedigger = {};
  let client = {};

  beforeAll(async () => {
    let _client = await clientService.create(validClient);
    let _graveDigger = await graveDiggerService.create(validGraveDigger);
    client = _client;
    gravedigger = _graveDigger;
  });

  afterAll(async () => {
    await graveDiggerService.delete(gravedigger.id);
    await clientService.delete(client.id);
  });

  test('GET tumulus/ - should return empty', async () => {
    await request(app).get('/tumulus').expect(200, []);
  });
  test('POST tumulus/- should create a new tumulus', async () => {
    const { body } = await request(app)
      .post('/tumulus')
      .send({ ...validTumulus, client, gravedigger })
      .expect(201);
    expect(body.id).toBeDefined();
    expect(body.deepness).toBe(validTumulus.deepness);
    expect(body.location).toBe(validTumulus.location);
    expect(body.tombstone).toBe(validTumulus.tombstone);
    // expect(body.client_id).toBe(validTumulus.client.id);
    // expect(body.gravedigger_id).toBe(validTumulus.gravedigger.id);
    tumulus = body;
  });
  test('GET tumulus/:id - should return the created tumulus', async () => {
    await request(app).get(`/tumulus/${tumulus.id}`).expect(200, tumulus);
  });

  test('PUT tumulus/:id - should update the tumulus', async () => {
    const updateTumulus = {
      deepness: -9,
      location: 9,
      tombstone: 'Stone',
      client_id: client.id,
      gravedigger_id: gravedigger.id,
    };
    await request(app)
      .put(`/tumulus/${tumulus.id}`)
      .send(updateTumulus)
      .expect(200, {
        id: tumulus.id,
        deepness: updateTumulus.deepness,
        location: updateTumulus.location,
        tombstone: updateTumulus.tombstone,
        client: { ...client, birth_date: client.birth_date.toISOString() },
        graveDigger: {
          ...gravedigger,
          birth_date: gravedigger.birth_date.toISOString(),
        },
      });
  });

  test('DELETE tumulus/:id - should delete the tumulus', async () => {
    await request(app).delete(`/tumulus/${tumulus.id}`).expect(200);
  });
});
