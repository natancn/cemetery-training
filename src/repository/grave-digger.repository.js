export class GraveDiggerRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(GraveDiggerEntity) {
    const sql = `
    INSERT INTO grave_digger (id, name, cpf, birth_date, nationality, gender)
    VALUES (
      null,
      ${this.connection.escape(GraveDiggerEntity.name)},
      ${this.connection.escape(GraveDiggerEntity.cpf)},
      ${this.connection.escape(GraveDiggerEntity.birthDate)},
      ${this.connection.escape(GraveDiggerEntity.nationality)},
      ${this.connection.escape(GraveDiggerEntity.gender)}
    )`;

    const [result] = await this.connection.query(sql);
    console.log(result);
    return result.insertId;
  }

  async findById(id) {
    const sql = `
      SELECT * FROM grave_digger WHERE id = ${this.connection.escape(id)}
      `;
    const [result] = await this.connection.query(sql);
    console.log(result);
    return result[0];
  }
  async findAll() {
    const sql = `
    SELECT * FROM grave_digger
    `;
    const [result] = await this.connection.query(sql);
    console.log(result);
    return result;
  }
  async update(GraveDiggerEntity) {
    const sql = `
    UPDATE grave_digger SET name = ${this.connection.escape(
      GraveDiggerEntity.name,
    )}, 
    cpf = ${this.connection.escape(GraveDiggerEntity.cpf)},
    birth_Date = ${this.connection.escape(GraveDiggerEntity.birthDate)},
    nationality = ${this.connection.escape(GraveDiggerEntity.nationality)},
    gender = ${this.connection.escape(GraveDiggerEntity.gender)}
     WHERE id = ${this.connection.escape(GraveDiggerEntity.id)}
    `;
    const [result] = await this.connection.query(sql);
    console.log(result);
  }
  async delete(id) {
    const sql = `
    DELETE FROM grave_digger WHERE id = ${this.connection.escape(id)}
    `;
    const [result] = await this.connection.query(sql);
    return result;
  }
}