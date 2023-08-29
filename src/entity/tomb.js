export class TombEntity {
  id;
  floors;
  haunted;
  size;
  location;
  client;
  constructor({ id, floors, haunted, size, location, client }) {
    this.id = id;
    this.floors = floors;
    this.haunted = haunted;
    this.size = size;
    this.location = location;
    this.client = client;
    this.validator();
  }

  validator() {
    const errors = [];

    if (!this.id || !(typeof this.id === 'number')) {
      errors.push(' invalid id');
    }
    if (
      !this.floors ||
      !(typeof this.floors === 'number') ||
      !(this.floors >= 0)
    ) {
      errors.push(' invalid floors');
    }

    if (!this.haunted || (this.haunted !== 'Y' && this.haunted !== 'N')) {
      errors.push(' invalid haunt');
    }

    if (!this.size || !(typeof this.size === 'number')) {
      errors.push(' invalid size');
    }
    if (!this.location || !(typeof this.location === 'number')) {
      errors.push(' invalid location');
    }
    if (!this.client) {
      errors.push(' invalid client');
    }
    if (errors.length > 0) {
      throw new Error(errors.join());
    }
    return;
  }
  clone() {
    return new TombEntity({
      id: this.id,
      floors: this.floors,
      haunted: this.haunted,
      size: this.size,
      location: this.location,
      client: this.client,
    });
  }
}
