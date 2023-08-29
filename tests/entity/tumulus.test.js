import { test, describe, expect } from '@jest/globals';
import { TumulusEntity } from '../../src/entity/tumulus';
import { validTumulus } from '../mocks/tumulus.mock';
import { GraveDiggerEntity } from '../../src/entity/grave-digger';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import { ClientEntity } from '../../src/entity/client';
import { validClient } from '../mocks/client.mocks';

describe('Tumulus - Unit Tests', () => {
  const errorMessage =
    ' invalid deepness, invalid location, invalid tombstone, invalid gravedigger, invalid client';
  const error = new Error(errorMessage);

  // test('should invalidate id if is not a number or a falsy', () => {
  //   expect(() => new TumulusEntity({})).toThrow(error);
  //   expect(() => new TumulusEntity({ id: ' ' })).toThrow(error);
  // });
  test('should invalidate deepness if is more than 0 or NaN', () => {
    expect(() => new TumulusEntity({})).toThrow(error);
    expect(() => new TumulusEntity({ deepness: 1 })).toThrow(error);
    expect(() => new TumulusEntity({ deepness: ' ' })).toThrow(error);
  });
  test('should invalidate location if not a number or a falsy', () => {
    expect(() => new TumulusEntity({})).toThrow(error);
    expect(() => new TumulusEntity({ location: ' ' })).toThrow(error);
  });
  test('should invalidate tombstone if is not Wood, Stone or Ivory', () => {
    expect(() => new TumulusEntity({})).toThrow(error);
    expect(() => new TumulusEntity({ tombstone: 'fey' })).toThrow(error);
    expect(() => new TumulusEntity({ tombstone: 2 })).toThrow(error);
  });
  test('should create a valid instance of tumulus', () => {
    const tumulus = new TumulusEntity(validTumulus);

    expect(tumulus.id).toStrictEqual(1);
    expect(tumulus.deepness).toStrictEqual(-3);
    expect(tumulus.location).toStrictEqual(2);
    expect(tumulus.tombstone).toStrictEqual('Wood');
    expect(tumulus.gravedigger).toEqual(
      new GraveDiggerEntity(validGraveDigger),
    );
    expect(tumulus.client).toEqual(new ClientEntity(validClient));

    expect(tumulus).toEqual(tumulus.clone());
  });
});
