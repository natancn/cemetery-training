export class CoffinRepository {
  constructor(connection) {
    this.connection = connection;
  }
  async insert(CoffinEntity) {
    const sql = `
    INSERT INTO coffin (id, material, size, location, tomb_id, tumulus_id)
    VALUES(
      null,
      ${this.connection.escape(CoffinEntity.material)},
      ${this.connection.escape(CoffinEntity.size)},
      ${this.connection.escape(CoffinEntity.location)},
      ${this.connection.escape(CoffinEntity.tomb.id)},
      ${this.connection.escape(CoffinEntity.tumulus.id)}
    )  
  `;
    const [result] = await this.connection.query(sql);
    return result.insertId;
  }
  async findById(id) {
    const sql = `
    SELECT * FROM coffin WHERE id = ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result[0];
  }
  async findAll() {
    const sql = `
    SELECT * FROM coffin
    `;
    const [result] = await this.connection.query(sql);
    return result;
  }
  async update(CoffinEntity) {
    const sql = `
    UPDATE coffin SET material = ${this.connection.escape(
      CoffinEntity.material,
    )},
    size = ${this.connection.escape(CoffinEntity.size)},
    location = ${this.connection.escape(CoffinEntity.location)},
    tomb_id = ${this.connection.escape(CoffinEntity.tomb.id)},
    tumulus_id = ${this.connection.escape(CoffinEntity.tumulus.id)}`;
    const [result] = await this.connection.query(sql);
    return result.changedRows === 1;
  }
  async delete(id) {
    const sql = `DELETE FROM coffin WHERE id = ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result;
  }
};