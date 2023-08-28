import { TumulusEntity } from '../entity/tumulus.js';

export class TumulusService {
  constructor(repositoryTumulus, clientService, graveDiggerService) {
    this.repositoryTumulus = repositoryTumulus;
    this.clientService = clientService;
    this.graveDiggerService = graveDiggerService;
  }

  async create(tumulusEntity) {
    try {
      const tumulus = new TumulusEntity({
        deepness: tumulusEntity.deepness,
        tombstone: tumulusEntity.tombstone,
        location: tumulusEntity.location,
        client: tumulusEntity.client,
        gravedigger: tumulusEntity.gravedigger,
      });
      const tumulusId = await this.repositoryTumulus.insert(tumulus);
      return this.findById(tumulusId);
    } catch (error) {
      console.log(error);
      return {
        error: error.message,
      };
    }
  }
  async findById(id) {
    try {
      const tumulus = await this.repositoryTumulus.findById(id);
      if (!tumulus) {
        return {
          error: true,
          errorMessage: 'tumulus not found',
        };
      }

      const client = await this.clientService.findById(tumulus.client_id);
      const graveDigger = await this.graveDiggerService.findById(
        tumulus.grave_digger_id,
      );

      return {
        id: tumulus.id,
        deepness: tumulus.deepness,
        location: tumulus.location,
        tombstone: tumulus.tombstone,
        client,
        graveDigger,
      };
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async update(id, tumulusData) {
    try {
      const tumulusEntity = new TumulusEntity({
        id,
        deepness: tumulusData.deepness,
        tombstone: tumulusData.tombstone,
        location: tumulusData.location,
        client: tumulusData.client,
        gravedigger: tumulusData.gravedigger,
      });
      const tumulus = await this.repositoryTumulus.update(tumulusEntity);
      if (!tumulus) {
        return {
          error: true,
          errorMessage: 'tumulus not updates',
        };
      }
      return this.findById(tumulusEntity.id);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async findAll() {
    try {
      const tumuluss = await this.repositoryTumulus.findAll();
      if (!tumuluss) {
        return {
          error: true,
          errorMessage: 'cannot find tumulus',
        };
      }

      // array com os tumulus
      const tumulusss = tumuluss.map(async tumulus => {
        // repetir o find by id
        // pegar client
        const client = await this.clientService.findById(tumulus.client_id);
        // pegar graveDigger
        const graveDigger = await this.graveDiggerService.findById(
          tumulus.grave_digger_id,
        );

        // retornar o objeto final
        return {
          id: tumulus.id,
          deepness: tumulus.deepness,
          location: tumulus.location,
          tombstone: tumulus.tombstone,
          client,
          graveDigger,
        };
      });

      // Promise.all resolve todas as promessas de um array
      return Promise.all(tumulusss);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async delete(id) {
    try {
      const result = await this.repositoryTumulus.delete(id);
      if (!result) {
        return {
          error: true,
          errorMessage: 'cannot delete tumulus',
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