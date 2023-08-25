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
    return result.insertId;
  }

  async findById(id) {
    const sql = `
      SELECT * FROM grave_digger WHERE id = ${this.connection.escape(id)}
      `;
    const [result] = await this.connection.query(sql);
    return result[0];
  }
  async findAll() {
    const sql = `
    SELECT * FROM grave_digger
    `;
    const [result] = await this.connection.query(sql);
    return result;
  }
  async update(GraveDiggerEntity) {
    const sql = `
    UPDATE grave_digger SET name = ${this.connection.escape(
      GraveDiggerEntity.name,
    )}, 
    cpf = ${this.connection.escape(GraveDiggerEntity.cpf)},
    birth_date = ${this.connection.escape(GraveDiggerEntity.birthDate)},
    nationality = ${this.connection.escape(GraveDiggerEntity.nationality)},
    gender = ${this.connection.escape(GraveDiggerEntity.gender)}
     WHERE id = ${this.connection.escape(GraveDiggerEntity.id)}
    `;
    const [result] = await this.connection.query(sql);
    return result.changedRows === 1;
  }
  async delete(id) {
    const sql = `
    DELETE FROM grave_digger WHERE id = ${this.connection.escape(id)}
    `;
    const [result] = await this.connection.query(sql);
    return result.affectedRows === 1;
  }
}
