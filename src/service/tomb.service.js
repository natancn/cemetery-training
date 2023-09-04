import { TombEntity } from '../entity/tomb.js';

export class TombService {
  constructor(repositoryTomb, clientService) {
    this.clientService = clientService;
    this.repositoryTomb = repositoryTomb;
  }
  async create(tombEntity) {
    try {
      const tomb = new TombEntity({
        floors: tombEntity.floors,
        haunted: tombEntity.haunted,
        location: tombEntity.location,
        size: tombEntity.size,
        client: tombEntity.client,
      });
      const tombId = await this.repositoryTomb.insert(tomb);
      return this.findById(tombId);
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  async findById(id) {
    try {
      const tomb = await this.repositoryTomb.findById(id);
      if (!tomb) {
        return {
          error: true,
          errorMessage: 'tomb not found',
        };
      }
      const client = await this.clientService.findById(tomb.client_id);
      return {
        id: tomb.id,
        floors: tomb.floors,
        haunted: tomb.haunted,
        location: Number(tomb.location),
        size: tomb.size,
        client,
      };
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async update(id, tombData) {
    try {
      const tombEntity = new TombEntity({
        id,
        floors: tombData.floors,
        haunted: tombData.haunted,
        location: tombData.location,
        size: tombData.size,
        client: tombData.client,
      });
      const tomb = await this.repositoryTomb.update(tombEntity);
      if (!tomb) {
        return {
          error: true,
          errorMessage: 'tomb not updated',
        };
      }
      return this.findById(tombEntity.id);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async findAll() {
    try {
      const tombs = await this.repositoryTomb.findAll();
      if (!tombs) {
        return {
          error: true,
          errorMessage: 'cannot find tomb',
        };
      }
      const tombses = tombs.map(async tomb => {
        const client = await this.clientService.findById(tomb.client_id);

        return {
          id: tomb.id,
          floors: tomb.floors,
          haunted: tomb.haunted,
          location: Number(tomb.location),
          size: tomb.size,
          client,
        };
      });

      return Promise.all(tombses);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async delete(id) {
    try {
      const result = await this.repositoryTomb.delete(id);
      if (!result) {
        return {
          error: true,
          errorMessage: 'cannot delete tomb',
        };
      }
      return result;
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
}
