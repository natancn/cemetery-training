export class CoffinEntity {
  id;
  material;
  size;
  location;
  tomb;
  tumulus;

  constructor({ id, material, location, size, tomb, tumulus }) {
    this.id = id;
    this.material = material;
    this.size = size;
    this.location = location;
    this.tomb = tomb;
    this.tumulus = tumulus;
    this.validator();
  }

  validator() {
    const errors = [];

    if (!this.id || !(typeof this.id === 'number')) {
      errors.push(' invalid id');
    }
    if (
      !this.material ||
      (this.material !== 'Carvalho' &&
        this.material !== 'Nogueira' &&
        this.material !== 'Pinho')
    ) {
      errors.push(' invalid material');
    }

    if (
      !this.size ||
      (this.size !== 'S' && this.size !== 'M' && this.size !== 'B')
    ) {
      errors.push(' invalid size');
    }
    if (!this.location || !(typeof this.location == 'number')) {
      errors.push(' invalid location');
    }
    if (!this.tomb) {
      errors.push(' invalid tomb');
    }
    if (!this.tumulus) {
      errors.push(' invalid tumulus');
    }
    if (errors.length > 0) {
      throw new Error(errors.join());
    }
    return;
  }
  clone() {
    return new CoffinEntity({
      id: this.id,
      material: this.material,
      size: this.size,
      location: this.location,
      tomb: this.tomb,
      tumulus: this.tumulus,
    });
  }
}
