export class Client{
    id;
    name;
    cpf;
    birthDate;
    nationality;
    gender;

constructor({ id, name, cpf, birthDate, nationality, gender }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.birthDate = birthDate;
    this.nationality = nationality;
    this.gender = gender;
    this.validator();
  }
  validator() {
    if (!this.id || !(typeof this.id === 'number')) {
      throw new Error('invalid id');
    }

    if (
      !this.name ||
      !(typeof this.name === 'string') ||
      !(this.name.length > 0 && this.name.length <= 255)
    ) {
      throw new Error('invalid name');
    }

    if (
      !this.cpf ||
      !(typeof this.cpf === 'number') ||
      String(this.cpf).length !== 11
    ) {
      throw new Error('invalid cpf');
    }

    if (!this.birthDate || !(typeof this.birthDate === 'string')) {
      throw new Error('invalid birth date');
    }

    if (
      !this.nationality ||
      !(typeof this.nationality === 'string') ||
      !(this.nationality.length > 0 && this.nationality.length <= 255)
    ) {
      throw new Error('invalid nationality');
    }

    if (this.gender !== 'M' && this.gender !== 'F' && this.gender !== 'NB') {
      throw new Error('invalid gender');
    }

    return;
  }
  clone() {
    return new ClientEntity({
      id: this.id,
      name: this.name,
      cpf: this.cpf,
      birthDate: this.birthDate,
      nationality: this.nationality,
      gender: this.gender,
    });
  }

}