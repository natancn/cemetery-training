import { describe, test, expect } from '@jest/globals';
import { app } from '../../src/presentation/app';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import request from 'supertest';

describe('Grave Digger controller - Unit Tests', () => {
  let graveDigger = {};

  test('GET gravedigger/ - should return empty', async () => {
    await request(app).get('/gravediggers').expect(200, []);
  });
  test('POST gravedigger/ - should create a new gravedigger', async () => {
    const { body } = await request(app)
      .post('/gravediggers')
      .send(validGraveDigger)
      .expect(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe(validGraveDigger.name);
    expect(body.cpf).toBe(validGraveDigger.cpf);
    expect(body.birth_date).toBe(
      new Date(validGraveDigger.birthDate + ' 00:00:000').toISOString(),
    );
    expect(body.nationality).toBe(validGraveDigger.nationality);
    graveDigger = body;
  });
  test('GET graveDiggers/:id - should return the created gravedigger', async () => {
    await request(app)
      .get(`/gravediggers/${graveDigger.id}`)
      .expect(200, graveDigger);
  });
  test('PUT gravediggers/:id - should update the gravedigger', async () => {
    const updateGraveDigger = {
      name: 'peter predorson',
      cpf: 87548758996,
      birthDate: '1882-03-09',
      nationality: 'polonês',
      gender: 'NB',
    };
    await request(app)
      .put(`/gravediggers/${graveDigger.id}`)
      .send(updateGraveDigger)
      .expect(200, {
        id: graveDigger.id,
        name: updateGraveDigger.name,
        cpf: updateGraveDigger.cpf,
        birth_date: new Date(
          updateGraveDigger.birthDate + ' 00:00:000',
        ).toISOString(),
        nationality: updateGraveDigger.nationality,
        gender: updateGraveDigger.gender,
      });
  });
  test('DELETE gravedigger/: id - should delete the gravedigger', async () => {
    await request(app).delete(`/gravediggers/${graveDigger.id}`).expect(200);
  });
});
