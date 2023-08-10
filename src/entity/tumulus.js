export class TumulusEntity {
  id;
  deepness;
  location;
  tombstone;
  gravedigger;
  client;
  constructor({ id, deepness, location, tombstone, gravedigger, client }) {
    this.id = id;
    this.deepness = deepness;
    this.location = location;
    this.tombstone = tombstone;
    this.gravedigger = gravedigger;
    this.client = client;
    this.validator();
  }

  validator() {
    const errors = [];

    if (!this.id || !(typeof this.id === 'number')) {
      errors.push(' invalid id');
    }
    if (
      !this.deepness ||
      !(typeof this.deepness === 'number') ||
      !(this.deepness <= 0)
    ) {
      errors.push(' invalid deepness');
    }
    if (!this.location || !(typeof this.location === 'number')) {
      errors.push(' invalid location');
    }
    if (
      !this.tombstone ||
      (this.tombstone !== 'Ivory' &&
        this.tombstone !== 'Stone' &&
        this.tombstone !== 'Wood')
    ) {
      errors.push(' invalid tombstone');
    }
    if (!this.gravedigger) {
      errors.push(' invalid gravedigger');
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
    return new TumulusEntity({
      id: this.id,
      deepness: this.deepness,
      location: this.location,
      tombstone: this.tombstone,
      gravedigger: this.gravedigger,
      client: this.client,
    });
  }
};