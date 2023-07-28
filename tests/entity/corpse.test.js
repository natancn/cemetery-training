import { test, describe, expect } from '@jest/globals';
import { CorpseEntity } from '../../src/entity/corpse';
import { validCorpse } from '../mocks/corpse.mock';
import { CoffinEntity } from '../../src/entity/coffin'
import { validCoffin } from '../mocks/coffin.mocks'

describe('Corpse - Unit Tests', ()=>{
    const errorMessage = ' invalid id, invalid name, invalid datamortis, invalid nationality, invalid gender, invalid coffin'
    const error = new Error(errorMessage)


    test('should invalidate id if is not a number or a falsy',()=>{
        expect(()=> new CorpseEntity({})).toThrow(error)
        expect(()=> new CorpseEntity({id: ' '})).toThrow(error)
    });
    test('should invalidate name if is not a string or is too big',()=>{
        expect(()=> new CorpseEntity({})).toThrow(error)
        expect(()=> new CorpseEntity({name: 2})).toThrow(error)
        expect(()=> new CorpseEntity({name:''})).toThrow(error)
        let tooBigString = 'a';
        for (let i = 0; i < 256; i++) {
          tooBigString += 'a'
        }
        expect(()=> new CorpseEntity({name: tooBigString})).toThrow(error)
    });

    test('should invalidate datamortis if is not a string or null',()=>{
        expect(()=> new CorpseEntity({})).toThrow(error)
        expect(()=> new CorpseEntity({datamortis: 2})).toThrow(error)
    });

    test('should invalidate nationality if is not a string/too big',()=>{
        expect(()=> new CorpseEntity({})).toThrow(error)
        expect(()=> new CorpseEntity({nationality: 2})).toThrow(error)
        let tooBigString = 'a';
        for (let i = 0; i < 256; i++) {
          tooBigString += 'a'
        }
        expect(()=> new CorpseEntity({nationality:tooBigString})).toThrow(error)

    });

    test('should invalidate gender if is not M, F or NB',()=>{
        expect(()=> new CorpseEntity({})).toThrow(error)
        expect(()=> new CorpseEntity({gender: 3})).toThrow(error)
        expect(()=> new CorpseEntity({gender: 'D'})).toThrow(error)

    });

    test('should create a valid instance of a Corpse',()=>{
        const corpse = new CorpseEntity(validCorpse);

        expect(corpse.id).toStrictEqual(1)
        expect(corpse.name).toStrictEqual('Figaro Souza')
        expect(corpse.datamortis).toStrictEqual('1999-02-23')
        expect(corpse.nationality).toStrictEqual('Inglês')
        expect(corpse.gender).toStrictEqual('M')
        expect(corpse.coffin).toEqual(new CoffinEntity(validCoffin))

        expect(corpse).toEqual(corpse.clone())
    });
});