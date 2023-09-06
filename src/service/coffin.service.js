import { CoffinEntity } from '../entity/coffin.js';

export class CoffinService {
  constructor(repositoryCoffin, tumulusService, tombService) {
    this.repositoryCoffin = repositoryCoffin;
    this.tumulusService = tumulusService;
    this.tombService = tombService;
  }

  async create(coffinEntity) {
    try {
      const coffin = new CoffinEntity({
        material: coffinEntity.material,
        location: coffinEntity.location,
        size: coffinEntity.size,
        tomb: coffinEntity.tomb,
        tumulus: coffinEntity.tumulus,
      });
      const coffinId = await this.repositoryCoffin.insert(coffin);
      return this.findById(coffinId);
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  async findById(id) {
    try {
      const coffin = await this.repositoryCoffin.findById(id);
      if (!coffin) {
        return {
          error: true,
          errorMessage: 'coffin not found',
        };
      }
      const tumulus = await this.tumulusService.findById(coffin.tumulus_id);
      const tomb = await this.tombService.findById(coffin.tomb_id);
      return {
        id: coffin.id,
        material: coffin.material,
        size: coffin.size,
        location: Number(coffin.location),
        tumulus,
        tomb,
      };
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async update(id, coffinData) {
    try {
      const coffinEntity = new CoffinEntity({
        id,
        material: coffinData.material,
        size: coffinData.size,
        location: coffinData.location,
        tumulus: coffinData.tumulus,
        tomb: coffinData.tomb,
      });
      const coffin = await this.repositoryCoffin.update(coffinEntity);
      if (!coffin) {
        return {
          error: true,
          errorMessage: 'coffin not updated',
        };
      }
      return this.findById(coffinEntity.id);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async findAll() {
    try {
      const coffins = await this.repositoryCoffin.findAll();
      if (!coffins) {
        return {
          error: true,
          errorMessage: 'cannot find coffin',
        };
      }
      const coffinses = coffins.map(async coffin => {
        const tumulus = await this.tumulusService.findById(coffin.tumulus_id);
        const tomb = await this.tombService.findById(coffin.tomb_id);

        return {
          id: coffin.id,
          material: coffin.material,
          size: coffin.size,
          location: Number(coffin.location),
          tumulus,
          tomb,
        };
      });
      return Promise.all(coffinses);
    } catch (error) {
      return {
        error: 'something went wrong',
      };
    }
  }
  async delete(id) {
    try {
      const result = await this.repositoryCoffin.delete(id);
      if (!result) {
        return {
          error: true,
          errorMessage: 'cannot delete coffin',
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
