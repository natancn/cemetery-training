export class ClientRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(clientEntity) {
    const sql = `
        INSERT INTO client (id, name, cpf, birth_date, nationality, gender) 
        VALUES (
          null, 
          ${this.connection.escape(clientEntity.name)},
          ${this.connection.escape(clientEntity.cpf)},
          ${this.connection.escape(clientEntity.birthDate)},
          ${this.connection.escape(clientEntity.nationality)},
          ${this.connection.escape(clientEntity.gender)}
        )
      `;

    const [result] = await this.connection.query(sql);
    console.log(result);
    return result.insertId;
  }

  // TODO
  async findById(id) {
    const sql = `
      SELECT * FROM client WHERE id = ${this.connection.escape(id)}
      `;
    const [result] = await this.connection.query(sql);
    console.log(result);
    return result[0];
  }

  // TODO
  async findAll() {
    const sql = `
    SELECT * FROM client
    `;
    const [result] = await this.connection.query(sql);
    console.log(result);
    return result;
  }

  // TODO
  async update(clientEntity) {
    const sql = `
    UPDATE client SET name = ${this.connection.escape(clientEntity.name)}, 
    cpf = ${this.connection.escape(clientEntity.cpf)},
    birth_Date = ${this.connection.escape(clientEntity.birthDate)},
    nationality = ${this.connection.escape(clientEntity.nationality)},
    gender = ${this.connection.escape(clientEntity.gender)}
     WHERE id = ${this.connection.escape(clientEntity.id)}
    `;
    const [result] = await this.connection.query(sql);
    console.log(result);
  }

  // TODO
  async delete(id) {
    const sql = `
    DELETE FROM client WHERE id = ${this.connection.escape(id)}
    `;
    const [result] = await this.connection.query(sql);
    return result;
  }
}
