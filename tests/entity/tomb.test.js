import { test, describe, expect } from '@jest/globals';
import { TombEntity } from '../../src/entity/tomb';
import { validTomb } from '../mocks/tomb.mock';
import { validClient } from '../mocks/client.mocks';
import { ClientEntity } from '../../src/entity/client';

describe('Tomb - Unit Tests', () => {
  const errorMessage =
    ' invalid id, invalid floors, invalid haunt, invalid size, invalid location, invalid client';
  const error = new Error(errorMessage);

  test('should invalidate id if is not a number or a falsy value', () => {
    expect(() => new TombEntity({})).toThrow(error);
    expect(() => new TombEntity({ id: ' ' })).toThrow(error);
  });
  test('should invalidade floors if is not a number or less than/equal to 0', () => {
    expect(() => new TombEntity({})).toThrow(error);
    expect(() => new TombEntity({ floors: '' })).toThrow(error);
    expect(() => new TombEntity({ floors: -1 })).toThrow(error);
  });
  test('should invalidade haunted if is not Y or N or is a falsy ', () => {
    expect(() => new TombEntity({})).toThrow(error);
    expect(() => new TombEntity({ haunted: 'O' })).toThrow(error);
    expect(() => new TombEntity({ haunted: 2 })).toThrow(error);
  });
  test('should invalidade size if is not a number or a falsy', () => {
    expect(() => new TombEntity({})).toThrow(error);
    expect(() => new TombEntity({ size: ' ' })).toThrow(error);
  });
  test('should invalidate location if not a number or a falsy', () => {
    expect(() => new TombEntity({})).toThrow(error);
    expect(() => new TombEntity({ location: ' ' })).toThrow(error);
  });

  test('should creat a valid instance of a Tomb', () => {
    const tomb = new TombEntity(validTomb);

    expect(tomb.id).toStrictEqual(1);
    expect(tomb.floors).toStrictEqual(2);
    expect(tomb.haunted).toStrictEqual('Y');
    expect(tomb.size).toStrictEqual(8);
    expect(tomb.location).toStrictEqual(2.3);
    expect(tomb.client).toEqual(new ClientEntity(validClient));

    expect(tomb).toEqual(tomb.clone());
  });
});
