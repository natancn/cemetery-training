import { describe, test, expect } from '@jest/globals';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import { GraveDiggerEntity } from '../../src/entity/grave-digger';
import { GraveDiggerRepository } from '../../src/repository/grave-digger.repository';
import connection from '../../src/database/mysql-connection';


describe('Grave Digger Repository - Unit Tests', ()=>{
  const repositoryGraveDigger = new GraveDiggerRepository(connection);
  let grave_diggerId = 0;

  test('should insert a new client in database', async () => {
    const  grave_digger = new GraveDiggerEntity(validGraveDigger);
    const result = await repositoryGraveDigger.insert(grave_digger);
    expect(result).toBeTruthy()
    grave_diggerId = result
  });
  test('should find grave digger in database', async ()=> {
    const grave_digger = await repositoryGraveDigger.findById(grave_diggerId)
    expect(grave_digger.id).toStrictEqual(grave_diggerId)
    expect(grave_digger.name).toStrictEqual('yorick malphite')
    expect(grave_digger.cpf).toStrictEqual(12345678910)
    expect(grave_digger.birthDate).toStrictEqual('2003-07-03')
    expect(grave_digger.nationality).toStrictEqual('Pedra')
    expect(grave_digger.gender).toStrictEqual('NB')
  });
  test('should update gravedigger in database', async()=>{
    const graveDiggerUp = new GraveDiggerEntity({id: grave_diggerId, name:'skelly skeleto', cpf: 11122233344, birthDate: '1900-06-02',nationality: 'manito', gender: 'F'})
    const grave_digger = await repositoryGraveDigger.update(graveDiggerUp)
    expect(grave_digger.id).toStrictEqual(grave_diggerId)
    expect(grave_digger.name).toStrictEqual('skelly skeleto')
    expect(grave_digger.cpf).toStrictEqual(11122233344)
    expect(grave_digger.birthDate).toStrictEqual('1900-06-02')
    expect(grave_digger.nationality).toStrictEqual('manito')
    expect(grave_digger.gender).toStrictEqual('F')
  });
  test('should delete gravedigger in database', async() =>{
    await repositoryGraveDigger.delete(grave_diggerId)
  });
});