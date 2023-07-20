import { test, describe, expect } from '@jest/globals';
import { GraveDiggerEntity } from '../../src/entity/grave-digger';
import { validGraveDigger } from '../mocks/grave-digger.mocks';

describe('Grave Digger - Unit Tests', () => {
  test('should invalid id if is not number or a falsy value', () => {
    expect(() => new GraveDiggerEntity({})).toThrowError('invalid id')
    expect(() => new GraveDiggerEntity({id: ' '})).toThrowError('invalid id')
  });

  test.todo('');

  test.todo('');

  test.todo('');

  test.todo('');

  test.todo('');

  test.todo('');

  test('should create a valid instance of grave digger', () => {
    const graveDigger = new GraveDiggerEntity(validGraveDigger);

    expect(graveDigger.id).toStrictEqual(1)
    expect(graveDigger.name).toStrictEqual('yorick malphite')
    expect(graveDigger.cpf).toStrictEqual(12345678910)
    expect(graveDigger.birthDate).toStrictEqual('19/07/2003')
    expect(graveDigger.nationality).toStrictEqual('Pedra')
    expect(graveDigger.gender).toStrictEqual('NB')

    expect(graveDigger).toEqual(graveDigger.clone())
  });
});
