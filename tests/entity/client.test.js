import { test, describe, expect } from '@jest/globals';
import { ClientEntity } from '../../src/entity/client';
import { validClient } from '../mocks/client.mocks';

describe('Client - Unit Tests', () => {
    const errorMessage = 'invalid name,invalid cpf,invalid birth date,invalid nationality,invalid gender'
    const error = new Error(errorMessage)


    test('should invalidate id if is not a number or a falsy value',()=>{
        expect(()=> new ClientEntity({})).toThrow(error)
        expect(()=> new ClientEntity({id:' '})).toThrow(error)
    });

    test('should invalidade name if is not a string or is too big/too small',()=>{
        expect(()=> new ClientEntity({})).toThrow(error)
        expect(()=> new ClientEntity({name: 2})).toThrow(error)
        expect(()=> new ClientEntity({name:''})).toThrow(error)
        let tooBigString = 'a';
        for (let i = 0; i < 256; i++) {
          tooBigString += 'a'
        }
        expect(()=> new ClientEntity({name:tooBigString})).toThrow(error)

    });

    test('should invalidade cpf if is not a number or is bigger than 11 num',()=>{
        expect(()=> new ClientEntity({})).toThrow(error)
        expect(()=> new ClientEntity({cpf:'a'})).toThrow(error)
        expect(()=> new ClientEntity({cpf: 2})).toThrow(error)
    });
    test('should invalidate birthDate if is not a string or null',()=>{
        expect(()=> new ClientEntity({})).toThrow(error)
        expect(()=> new ClientEntity({birthDate: 2}))

    });

    test('should invalidate nationality if is not a string or is too big/too small',()=>{
        expect(()=> new ClientEntity({})).toThrow(error)
        expect(()=> new ClientEntity({nationality: 2})).toThrow(error)
        let tooBigString = 'a';
        for (let i = 0; i < 256; i++) {
          tooBigString += 'a'
        }
        expect(()=> new ClientEntity({nationality:tooBigString})).toThrow(error)
    });
    
    test('should invalidate gender if is not one of the options avaiable',()=>{
        expect(()=> new ClientEntity({})).toThrow(error)
        expect(()=> new ClientEntity({gender: 'D'})).toThrow(error)
        expect(()=> new ClientEntity({gender: 3})).toThrow(error)
    });

    test('should create a valid instance of Client',()=>{

        const client = new ClientEntity(validClient);

        expect(client.id).toStrictEqual(1)
        expect(client.name).toStrictEqual('pedro malphite')
        expect(client.cpf).toStrictEqual(12345678910)
        expect(client.birthDate).toStrictEqual('2031-09-02') // mudar
        expect(client.nationality).toStrictEqual('Montanha')
        expect(client.gender).toStrictEqual('M')

        expect(client).toEqual(client.clone())
    });
});