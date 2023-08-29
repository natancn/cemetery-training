export class CorpseEntity {
  id;
  name;
  datamortis;
  nationality;
  gender;
  coffin;

  constructor({ id, name, datamortis, nationality, gender, coffin }) {
    this.id = id;
    this.name = name;
    this.datamortis = datamortis;
    this.nationality = nationality;
    this.gender = gender;
    this.coffin = coffin;
    this.validator();
  }

  validator() {
    const errors = [];

    if (!this.id || !(typeof this.id === 'number')) {
      errors.push(' invalid id');
    }
    if (
      !this.name ||
      !(typeof this.name === 'string') ||
      !(this.name.length > 0 && this.name.length <= 255)
    ) {
      errors.push(' invalid name');
    }
    if (!this.datamortis || typeof this.datamortis !== 'string') {
      errors.push(' invalid datamortis');
    }

    if (
      !this.nationality ||
      !(typeof this.nationality === 'string') ||
      !(this.nationality.length > 0 && this.nationality.length <= 255)
    ) {
      errors.push(' invalid nationality');
    }
    if (
      !this.gender ||
      (this.gender !== 'M' && this.gender !== 'F' && this.gender !== 'NB')
    ) {
      errors.push(' invalid gender');
    }
    if (!this.coffin) {
      errors.push(' invalid coffin');
    }
    if (errors.length > 0) {
      throw new Error(errors.join());
    }
    return;
  }
  clone() {
    return new CorpseEntity({
      id: this.id,
      name: this.name,
      datamortis: this.datamortis,
      nationality: this.nationality,
      gender: this.gender,
      coffin: this.coffin,
    });
  }
}
