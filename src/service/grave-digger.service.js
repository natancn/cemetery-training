import { GraveDiggerEntity } from '../entity/grave-digger.js';

export class GraveDiggerService {
  constructor(repositoryGraveDigger) {
    this.repositoryGraveDigger = repositoryGraveDigger;
  }
  async create(GraveDiggerEntity) {
    try {
      const graveDigger = new GraveDiggerEntity({
        name: GraveDiggerEntity.name,
        cpf: GraveDiggerEntity.cpf,
        birthDate: GraveDiggerEntity.birthDate,
        nationality: GraveDiggerEntity.birthDate,
        gender: GraveDiggerEntity.gender,
      });
      const graveDiggerId = await this.repositoryGraveDigger.insert(
        graveDigger,
      );
      return this.findById(graveDiggerId);
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  async findById(id) {
    try {
      const graveDigger = await this.repositoryGraveDigger.findById(id);
      if (!graveDigger) {
        return {
          error: true,
          errorMessage: 'gravedigger not found',
        };
      }
      return graveDigger;
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async update(id, graveDiggerData) {
    try {
      const graveDiggerEntity = new GraveDiggerEntity({
        id,
        name: graveDiggerData.name,
        cpf: graveDiggerData.cpf,
        birthDate: graveDiggerData.birthDate,
        nationality: graveDiggerData.nationality,
        gender: graveDiggerData.gender,
      });
      const graveDigger = await this.repositoryGraveDigger.update(
        graveDiggerEntity,
      );
      if (!graveDigger) {
        return {
          error: true,
          errorMessage: 'gravedigger not updated',
        };
      }
      return this.findById(graveDiggerEntity.id);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async findAll() {
    try {
      const graveDiggers = await this.repositoryGraveDigger.findAll();
      if (!graveDiggers) {
        return {
          error: true,
          errorMessage: 'cannot find gravediggers',
        };
      }
      return graveDiggers;
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async delete(id) {
    try {
      const result = await this.repositoryGraveDigger.delete(id);
      if (!result) {
        return {
          error: true,
          errorMessage: 'could not delete',
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