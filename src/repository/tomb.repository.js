export class TombRepository {
  constructor(connection) {
    this.connection = connection;
  }
  async insert(TombEntity) {
    const sql = `
    INSERT INTO tomb (id, floors, size, location, client_id, haunted)
    VALUES (
      null,
      ${this.connection.escape(TombEntity.floors)},
      ${this.connection.escape(TombEntity.size)},
      ${this.connection.escape(TombEntity.location)},
      ${this.connection.escape(TombEntity.client.id)},
      ${this.connection.escape(TombEntity.haunted)}
    )
    `;

    const [result] = await this.connection.query(sql);
    return result.insertId;
  }
  async findById(id) {
    const sql = `
    SELECT * FROM tomb WHERE id = ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result[0];
  }
  async findAll() {
    const sql = `
    SELECT * FROM tomb
    `;
    const [result] = await this.connection.query(sql);
    return result;
  }
  async update(TombEntity) {
    const sql = `
    UPDATE tomb SET floors = ${this.connection.escape(TombEntity.floors)},
    size = ${this.connection.escape(TombEntity.size)},
    location = ${this.connection.escape(TombEntity.location)},
    haunted = ${this.connection.escape(TombEntity.haunted)},
    client_id = ${this.connection.escape(TombEntity.client.id)}
    `;
    const [result] = await this.connection.query(sql);
    return result.changedRows === 1;
  }
  async delete(id) {
    const sql = `DELETE FROM tomb WHERE id = ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result;
  }
};
