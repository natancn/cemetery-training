export class ClientEntity{
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

    const errors =[]

    if (!this.id || !(typeof this.id === 'number')) {
      errors.push('invalid id');
    }

    if (
      !this.name ||
      !(typeof this.name === 'string') ||
      !(this.name.length > 0 && this.name.length <= 255)
    ) {
      errors.push('invalid name');
    }

    if (
      !this.cpf ||
      !(typeof this.cpf === 'number') ||
      String(this.cpf).length !== 11
    ) {
      errors.push('invalid cpf');
    }

    if (!this.birthDate || (typeof this.birthDate !== 'string')) {
      errors.push('invalid birth date');
    }

    if (
      !this.nationality ||
      !(typeof this.nationality === 'string') ||
      !(this.nationality.length > 0 && this.nationality.length <= 255)
    ) {
      errors.push('invalid nationality');
    }

    if (this.gender !== 'M' && this.gender !== 'F' && this.gender !== 'NB') {
      errors.push('invalid gender');
    }
    
    if(errors.length > 0) {
      throw new Error(errors.join())
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