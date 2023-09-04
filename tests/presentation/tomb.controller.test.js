import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../src/presentation/app';
import request from 'supertest';
import { validClient } from '../mocks/client.mocks';
import { ClientServiceFactory } from '../../src/service/factory/client.service.factory';
import { validTomb } from '../mocks/tomb.mock';

describe('Tomb controller - Unit Tests', () => {
  let tomb = {};
  let client = {};
  let clientService = ClientServiceFactory.getInstance();

  beforeAll(async () => {
    let _client = await clientService.create(validClient);
    client = _client;
  });
  afterAll(async () => {
    await clientService.delete(client.id);
  });
  test('GET tomb/ - should return empty', async () => {
    await request(app).get('/tomb').expect(200, []);
  });
  test('POST tomb/ - should create a new tomb', async () => {
    const { body } = await request(app)
      .post('/tomb')
      .send({ ...validTomb, client })
      .expect(201);
    expect(body.id).toBeDefined();
    expect(body.floors).toBe(validTomb.floors);
    expect(body.haunted).toBe(validTomb.haunted);
    expect(body.location).toBe(validTomb.location);
    expect(body.size).toBe(validTomb.size);
    tomb = body;
  });
  test('GET tomb/:id - should return the created tomb', async () => {
    await request(app).get(`/tomb/${tomb.id}`).expect(200, tomb);
  });
  test('PUT tomb/:id - should update the tomb', async () => {
    const updateTomb = {
      floors: 9,
      haunted: 'Y',
      location: 9.2,
      size: 9,
      client_id: client.id,
    };
    await request(app)
      .put(`/tomb/${tomb.id}`)
      .send(updateTomb)
      .expect(200, {
        id: tomb.id,
        floors: updateTomb.floors,
        haunted: updateTomb.haunted,
        location: updateTomb.location,
        size: updateTomb.size,
        client: { ...client, birth_date: client.birth_date.toISOString() },
      });
  });
  test('DELETE tomb/:id - should delete the tomb', async () => {
    await request(app).delete(`/tomb/${tomb.id}`).expect(200);
  });
});
