import { describe, expect, test } from '@jest/globals';
import { Util } from '../../src/util/util';

describe('Util - Unit Tests', () => {
  test.skip('should return a valid date in yyyy-mm-dd hh:mm:ss', () => {
    const now = new Date();
    const month =
      String(now.getUTCMonth()).length === 1
        ? `0${now.getUTCMonth() + 1}`
        : now.getUTCMonth();

    const day =
      String(now.getDate()).length === 1 ? `0${now.getDate()}` : now.getDate();

    const hours =
      String(now.getUTCHours()).length === 1
        ? `0${now.getUTCHours()}`
        : now.getUTCHours();

    const minutes =
      String(now.getUTCMinutes()).length === 1
        ? `0${now.getUTCMinutes()}`
        : now.getUTCMinutes();

    const seconds =
      String(now.getUTCSeconds()).length === 1
        ? `0${now.getUTCSeconds()}`
        : now.getUTCSeconds();

    const expected = `${now.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}.${now.getMilliseconds()}`;
    const result = Util.getDateTime();

    expect(result).toBe(expected);
  });
});
