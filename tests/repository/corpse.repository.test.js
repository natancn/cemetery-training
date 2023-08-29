import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { validCoffin } from '../mocks/coffin.mocks';
import { CoffinRepository } from '../../src/repository/coffin.repository';
import { CoffinEntity } from '../../src/entity/coffin';
import { TombEntity } from '../../src/entity/tomb';
import { TombRepository } from '../../src/repository/tomb.repository';
import { validTomb } from '../mocks/tomb.mock';
import { TumulusEntity } from '../../src/entity/tumulus';
import { validTumulus } from '../mocks/tumulus.mock';
import { TumulusRepository } from '../../src/repository/tumulus.repository';
import connection from '../../src/database/mysql-connection';
import { validClient } from '../mocks/client.mocks';
import { ClientEntity } from '../../src/entity/client';
import { ClientRepository } from '../../src/repository/client.repository';
import { GraveDiggerRepository } from '../../src/repository/grave-digger.repository';
import { validGraveDigger } from '../mocks/grave-digger.mocks';
import { GraveDiggerEntity } from '../../src/entity/grave-digger';
import { CorpseRepository } from '../../src/repository/corpse.repository';
import { CorpseEntity } from '../../src/entity/corpse';
import { validCorpse } from '../mocks/corpse.mock';

describe('Corpse Repository - Unit Tests', () => {
  let client = validClient;
  const repositoryClient = new ClientRepository(connection);

  let tomb = validTomb;
  const repositoryTomb = new TombRepository(connection);

  let tumulus = validTumulus;
  const repositoryTumulus = new TumulusRepository(connection);

  let gravedigger = validGraveDigger;
  const repositoryGraveDigger = new GraveDiggerRepository(connection);

  let coffin = validCoffin;
  const repositoryCoffin = new CoffinRepository(connection);

  const repositoryCorpse = new CorpseRepository(connection);
  let corpseId = 0;

  beforeAll(async () => {
    const _client = new ClientEntity(validClient);
    const result = await repositoryClient.insert(_client);
    client.id = result;

    const tombMock = { ...validTomb, client };
    const _tomb = new TombEntity(tombMock);
    const result1 = await repositoryTomb.insert(_tomb);
    tomb.id = result1;

    const _graveDigger = new GraveDiggerEntity(validGraveDigger);
    const result2 = await repositoryGraveDigger.insert(_graveDigger);
    gravedigger.id = result2;

    const tumulusMock = { ...validTumulus, client, gravedigger };
    const _tumulus = new TumulusEntity(tumulusMock);
    const result3 = await repositoryTumulus.insert(_tumulus);
    tumulus.id = result3;

    const coffinMock = { ...validCoffin, client, tumulus, gravedigger, tomb };
    const _coffin = new CoffinEntity(coffinMock);
    const result4 = await repositoryCoffin.insert(_coffin);
    coffin.id = result4;
  });

  afterAll(async () => {
    await repositoryCoffin.delete(coffin.id);
    await repositoryTomb.delete(tomb.id);
    await repositoryTumulus.delete(tumulus.id);
    await repositoryClient.delete(client.id);
    await repositoryGraveDigger.delete(gravedigger.id);
  });
  test('should inser a corpse in database', async () => {
    const corpseMock = { ...validCorpse, validCoffin };
    const corpse = new CorpseEntity(corpseMock);
    const result = await repositoryCorpse.insert(corpse);
    expect(result).toBeTruthy();
    corpseId = result;
  });
  test('should find a corpse in database', async () => {
    const corpse = await repositoryCorpse.findById(corpseId);
    expect(corpse.id).toStrictEqual(corpseId);
    expect(corpse.name).toStrictEqual('Figaro Souza');
    expect(corpse.datamortis).toStrictEqual(new Date('1999-02-23 00:00:000'));
    expect(corpse.nationality).toStrictEqual('Inglês');
    expect(corpse.gender).toStrictEqual('M');
  });
  test('should update corpse in database', async () => {
    const corpseUp = new CorpseEntity({
      id: corpseId,
      name: 'Senninha',
      datamortis: '1888-04-05 00:00:000',
      nationality: 'Peruano',
      gender: 'F',
      coffin,
    });
    const result = await repositoryCorpse.update(corpseUp);
    const corpse = await repositoryCorpse.findById(corpseId);
    expect(result).toBeTruthy();
    expect(corpse.id).toStrictEqual(corpseId);
    expect(corpse.name).toStrictEqual(corpseUp.name);
    expect(corpse.datamortis).toStrictEqual(new Date(corpseUp.datamortis));
    expect(corpse.gender).toStrictEqual(corpseUp.gender);
    expect(corpse.nationality).toStrictEqual(corpseUp.nationality);
  });

  test('should delete corpse in database', async () => {
    await repositoryCorpse.delete(corpseId);
  });
});
