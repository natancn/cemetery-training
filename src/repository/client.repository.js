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
    return result.affectedRows === 1;
  }

  // TODO
  async findById(id) {
    const sql = `
      SELECT * FROM client WHERE id = ${this.connection.escape(id)}
      `;
    const result = await this.connection.query(sql);
    console.log(result);
    return;
  }

  // TODO
  async findAll() {}

  // TODO
  async update() {}

  // TODO
  async delete() {}
}
