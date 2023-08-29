import { test, describe, expect } from '@jest/globals';
import { GraveDiggerEntity } from '../../src/entity/grave-digger';
import { validGraveDigger } from '../mocks/grave-digger.mocks';

describe('Grave Digger - Unit Tests', () => {
  const errorMessage =
    'invalid name,invalid cpf,invalid birth date,invalid nationality,invalid gender';
  const error = new Error(errorMessage);

  test('should invalidate id if is not a number or a falsy value', () => {
    expect(() => new GraveDiggerEntity({})).toThrow(error);
    expect(() => new GraveDiggerEntity({ id: ' ' })).toThrow(error);
  });

  test('should invalidate name if is not a string or has a oversized/too smal length', () => {
    expect(() => new GraveDiggerEntity({})).toThrow(error);
    expect(() => new GraveDiggerEntity({ name: 2 })).toThrow(error);
    expect(() => new GraveDiggerEntity({ name: '' }).toThrow(error));
    let tooBigString = 'a';
    for (let i = 0; i < 256; i++) {
      tooBigString += 'a';
    }
    expect(() => new GraveDiggerEntity({ name: tooBigString }).toThrow(error));
  });

  test('should invalidate cpf if is not a number or is too big or too smal', () => {
    expect(() => new GraveDiggerEntity({}).toThrow(error));
    expect(() => new GraveDiggerEntity({ cpf: '' })).toThrow(error);
    expect(() => new GraveDiggerEntity({ cpf: 2 }).toThrow(error));
  });

  test('should invalidate birthDate if is not a string or is falsy', () => {
    expect(() => new GraveDiggerEntity({}).toThrow(error));
    expect(() => new GraveDiggerEntity({ birthDate: 2 }).toThrow(error));
  });

  test('should invalidate nationality if is too big/too small or not a string', () => {
    expect(() => new GraveDiggerEntity({}).toThrow(error));
    expect(() => new GraveDiggerEntity({ nationality: 2 }).toThrow(error));
    let tooBigString = 'a';
    for (let i = 0; i < 256; i++) {
      tooBigString += 'a';
    }
    expect(() =>
      new GraveDiggerEntity({ nationality: tooBigString }).toThrow(error),
    );
  });

  test('should invalidade gender if is not M, F or NB', () => {
    expect(() => new GraveDiggerEntity({}).toThrow(error));
    expect(() => new GraveDiggerEntity({ gender: 2 }).toThrow(error));
    expect(() => new GraveDiggerEntity({ gender: 'N' }).toThrow(error));
  });

  test('should create a valid instance of grave digger', () => {
    const graveDigger = new GraveDiggerEntity(validGraveDigger);

    expect(graveDigger.id).toStrictEqual(1);
    expect(graveDigger.name).toStrictEqual('yorick malphite');
    expect(graveDigger.cpf).toStrictEqual(12345678910);
    expect(graveDigger.birthDate).toStrictEqual('2003-07-03');
    expect(graveDigger.nationality).toStrictEqual('Pedra');
    expect(graveDigger.gender).toStrictEqual('NB');

    expect(graveDigger).toEqual(graveDigger.clone());
  });
});
