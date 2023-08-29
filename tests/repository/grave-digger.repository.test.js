import { describe, test, expect } from '@jest/globals';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import { GraveDiggerEntity } from '../../src/entity/grave-digger';
import { GraveDiggerRepository } from '../../src/repository/grave-digger.repository';
import connection from '../../src/database/mysql-connection';

describe('Grave Digger Repository - Unit Tests', () => {
  const repositoryGraveDigger = new GraveDiggerRepository(connection);
  let grave_diggerId = 0;

  test('should insert a new client in database', async () => {
    const grave_digger = new GraveDiggerEntity(validGraveDigger);
    const result = await repositoryGraveDigger.insert(grave_digger);
    expect(result).toBeTruthy();
    grave_diggerId = result;
  });
  test('should find grave digger in database', async () => {
    const grave_digger = await repositoryGraveDigger.findById(grave_diggerId);
    expect(grave_digger.id).toStrictEqual(grave_diggerId);
    expect(grave_digger.name).toStrictEqual('yorick malphite');
    expect(grave_digger.cpf).toStrictEqual(12345678910);
    expect(grave_digger.birth_date).toStrictEqual(
      new Date('2003-07-03 00:00:000'),
    );
    expect(grave_digger.nationality).toStrictEqual('Pedra');
    expect(grave_digger.gender).toStrictEqual('NB');
  });
  test('should update gravedigger in database', async () => {
    const graveDiggerUp = new GraveDiggerEntity({
      id: grave_diggerId,
      name: 'skelly skeleto',
      cpf: 11122233344,
      birthDate: '1900-06-02',
      nationality: 'manito',
      gender: 'F',
    });
    const result = await repositoryGraveDigger.update(graveDiggerUp);
    expect(result).toBeTruthy();
    const grave_digger = await repositoryGraveDigger.findById(grave_diggerId);
    expect(grave_digger.id).toStrictEqual(graveDiggerUp.id);
    expect(grave_digger.name).toStrictEqual(graveDiggerUp.name);
    expect(grave_digger.cpf).toStrictEqual(graveDiggerUp.cpf);
    expect(grave_digger.birth_date).toStrictEqual(
      new Date(graveDiggerUp.birthDate + ' 00:00:000'),
    );
    expect(grave_digger.nationality).toStrictEqual(graveDiggerUp.nationality);
    expect(grave_digger.gender).toStrictEqual(graveDiggerUp.gender);
  });
  test('should delete gravedigger in database', async () => {
    const input = grave_diggerId;
    const output = await repositoryGraveDigger.delete(input);
    expect(output).toBeTruthy();
  });
});
