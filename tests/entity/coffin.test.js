import { test, describe, expect } from '@jest/globals';
import { CoffinEntity } from '../../src/entity/coffin';
import { validCoffin } from '../mocks/coffin.mocks';
import { TombEntity } from '../../src/entity/tomb';
import { validTomb } from '../mocks/tomb.mock';
import { TumulusEntity } from '../../src/entity/tumulus';
import { validTumulus } from '../mocks/tumulus.mock';

describe('Coffin - Unit Tests', ()=>{

    const errorMessage = ' invalid id, invalid material, invalid size, invalid location, invalid tomb, invalid tumulus'
    const error = new Error(errorMessage)

    test('should invalidate id if not a number or a falsy', ()=>{
        expect(()=> new CoffinEntity ({})).toThrow(error)
        expect(()=> new CoffinEntity({id: ' '})).toThrow(error)
    });
    test('should invalidate material if differs from Carvalho, Nogueira and Pinho', ()=>{
        expect(()=> new CoffinEntity({})).toThrow(error)
        expect(()=> new CoffinEntity({material: 2})).toThrow(error)
        expect(()=> new CoffinEntity({material:'whatever'})).toThrow(error)
    });

    test('should invalidate size if differs from S, M or B',()=>{
        expect(()=> new CoffinEntity({})).toThrow(error)
        expect(()=> new CoffinEntity({size: 2})).toThrow(error)
        expect(()=> new CoffinEntity({size: 'whatever'})).toThrow(error)
    });
    test('should invalidate location if not a number',()=>{
        expect(()=> new CoffinEntity({})).toThrow(error)
        expect(()=> new CoffinEntity({location:''})).toThrow(error)
    });

    test('should create a valid instance of coffin',()=>{
        const coffin = new CoffinEntity(validCoffin);

        expect(coffin.id).toStrictEqual(1)
        expect(coffin.material).toStrictEqual('Carvalho')
        expect(coffin.size).toStrictEqual('M')
        expect(coffin.location).toStrictEqual(2.3)
        expect(coffin.tomb).toEqual(new TombEntity(validTomb))
        expect(coffin.tumulus).toEqual(new TumulusEntity(validTumulus))

        expect(coffin).toEqual(coffin.clone())

    });
});