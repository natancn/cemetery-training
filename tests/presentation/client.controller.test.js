import { describe, test, expect } from '@jest/globals';
import { app } from '../../src/presentation/app';
import { validClient } from '../mocks/client.mocks';
import request from 'supertest';
import { ClientEntity } from '../../src/entity/client';

describe('Client Controller - Unit Tests', () => {
  let client = {}
  test('GET client/ - should return empty', async () => {
    await request(app).get('/clients').expect(200, [])
  });

  test('POST client/ - should create a new client', async () => {
      const { body } = await request(app)
        .post('/clients')
        .send(validClient)
        .expect(201)

      expect(body.id).toBeDefined()
      expect(body.name).toBe(validClient.name)
      expect(body.cpf).toBe(validClient.cpf)
      expect(body.birth_date).toBe(new Date(validClient.birthDate + ' 00:00:000').toISOString())
      expect(body.nationality).toBe(validClient.nationality)
      expect(body.gender).toBe(validClient.gender)
      client = body
  });

  test('GET client/:id - should return the created client', async () => {
    await request(app).get(`/clients/${client.id}`).expect(200, client)
  });
  test('PUT client/:id - should update the client', async()=>{
    const updatedClient = {name:'godotsson gdepto', 
    cpf:12452378785, 
    birthDate:'1999-02-01',
    nationality:'holandês',
    gender:'NB'}
    await request(app)
      .put(`/clients/${client.id}`)
      .send(updatedClient)
      .expect(200,{
        id:client.id,
        name:updatedClient.name, 
        cpf: updatedClient.cpf,
        birth_date:new Date(updatedClient.birthDate + ' 00:00:000').toISOString(),
        nationality:updatedClient.nationality,
        gender:updatedClient.gender
      })
    });
    test('DELETE client/: id - should delete the client', async()=>{
      await request(app).delete(`/clients/${client.id}`).expect(200)

    });
});