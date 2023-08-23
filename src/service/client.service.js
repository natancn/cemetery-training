
import { ClientEntity } from '../entity/client.js';

export class ClientService {
  constructor(repositoryClient) {
    this.repositoryClient = repositoryClient;
  }

  async create(clientEntity) {
    try {
      const client = new ClientEntity({
        birthDate: clientEntity.birthDate,
        cpf: clientEntity.cpf,
        gender: clientEntity.gender,
        name: clientEntity.name,
        nationality: clientEntity.nationality,
      });

      const clientId = await this.repositoryClient.insert(client);

      return this.findById(clientId);
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async findById(id) {
    try {
      const client = await this.repositoryClient.findById(id);

      if (!client) {
        return {
          error: true,
          errorMessage: 'client not found',
        };
      }

      return client;
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }

  async update(id, clientData) {
    try {
      const clientEntity = new ClientEntity({
        id,
        name: clientData.name,
        cpf: clientData.cpf,
        birthDate: clientData.birthDate,
        nationality: clientData.nationality,
        gender: clientData.gender,
      });
      const client = await this.repositoryClient.update(clientEntity);

      if (!client) {
        return {
          error: true,
          errorMessage: 'client not updated',
        };
      }

      return this.findById(clientEntity.id);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async findAll() {
    try {
      const clients = await this.repositoryClient.findAll();
      if (!clients) {
        return {
          error: true,
          errorMessage: 'cannot find client',
        };
      }
      return clients;
    } catch (error) {
      return {
        error: 'something went TERRIBLY WRONG',
      };
    }
  }
  async delete(id) {
    try {
      const result = await this.repositoryClient.delete(id);
      if (!result)
        return {
          error: true,
          errorMessage: 'he is here, do something',
        };
      else {
        return result;
      }
    } catch (error) {
      return {
        error: 'noooo, help us',
      };
    }
  }
}