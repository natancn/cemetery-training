import { CoffinEntity } from '../../src/entity/coffin';
import { validCoffin } from './coffin.mocks';

export const validCorpse = {
  id: 1,
  name: 'Figaro Souza',
  datamortis: '1999-02-23',
  nationality: 'Inglês',
  gender: 'M',
  coffin: new CoffinEntity(validCoffin),
};