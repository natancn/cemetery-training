export class TumulusRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(tumulusEntity) {
    const sql = `
    INSERT INTO tumulus (id, deepness, tombstone, client_id, grave_digger_id, location)
    VALUES (
      null,
      ${this.connection.escape(tumulusEntity.deepness)},
      ${this.connection.escape(tumulusEntity.tombstone)},
      ${this.connection.escape(tumulusEntity.client_id)},
      ${this.connection.escape(tumulusEntity.grave_digger_id)},
      ${this.connection.escape(tumulusEntity.location)}
    )
  `;
    const [result] = await this.connection.query(sql);
    return result.insertId;
  }
  async findById(id) {
    const sql = `
    SELECT * FROM tumulus WHERE id = ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result[0];
  }
  async findAll() {
    const sql = `
    SELECT * FROM tumulus
    `;
    const [result] = await this.connection.query(sql);
    console.log(result);
    return result;
  }
  async update(tumulusEntity) {
    const sql = `
    UPDATE tumulus SET tombstone = ${this.connection.escape(
      tumulusEntity.tombstone,
    )},
    client = ${this.connection.escape(tumulusEntity.client_id)},
    deepness = ${this.connection.escape(tumulusEntity.deepness)},
    location = ${this.connection.escape(tumulusEntity.location)},
    grave_digger_id = ${this.connection.escape(tumulusEntity.grave_digger_id)},
    tombstone = ${this.connection.escape(tumulusEntity.tombstone)} 
    `;
    const [result] = await this.connection.query(sql);
    return result.changedRows === 1;
  }
  async delete(id) {
    const sql = `DELETE FROM tumulus WHERE id = ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result;
  }
}