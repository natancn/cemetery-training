import { describe, test, expect } from '@jest/globals';
import connection from '../../src/repository/grave-digger.repository';
import { GraveDiggerRepository } from "../../src/repository/grave-digger.repository";
import { GraveDiggerService } from "../../src/service/grave-digger.service";
import { validGraveDigger } from "../mocks/grave-digger.mocks";
import { GraveDiggerEntity } from "../../src/entity/grave-digger";

describe('Gravedigger Service - Unit Tests',()=>{
  const repository = new GraveDiggerRepository(connection);
  const service = new GraveDiggerService(repository)
  let graveDigger = {}
  test('should create a new client', async()=>{
    const createdGraveDigger = await service.create(validGraveDigger);
    expect(createdGraveDigger.name).toEqual('yorick malphite');
    expect(createdGraveDigger.cpf).toEqual(12345678910);
    expect(createdGraveDigger.birth_date).toEqual('2003-07-03');
    expect(createdGraveDigger.nationality).toEqual('Pedra');
    expect(createdGraveDigger.gender).toEqual('NB');
    graveDigger = createdGraveDigger
  })
  test('should return not found gravedigger', async()=>{
    const {error, errorMessage} = await service.findById(0);
    expect(error).toBeTruthy()
    expect(errorMessage).toBe('gravedigger not found')
  })
  test('should update a gravedigger', async()=>{
    const graveDiggerUp = new GraveDiggerEntity({name:"sonic", 
    cpf:77744455532, 
    birthDate:"2008-02-01", 
    nationality:"Vietnamita", 
    gender:"M"});
    const result = await service.update(graveDigger.id, graveDiggerUp)
    expect(result.id).toStrictEqual(graveDigger.id)
    expect(result.name).toStrictEqual('sonic')
    expect(result.cpf).toStrictEqual(77744455532)
    expect(result.birth_date).toStrictEqual(new Date('2008-02-01 00:00:000'))
    expect(result.nationality).toStrictEqual('Vietnamita')
    expect(result.gender).toStrictEqual('M')
  })
})