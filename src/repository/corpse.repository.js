export class CorpseRepository {
  constructor(connection) {
    this.connection = connection;
  }
  async insert(CorpseEntity) {
    const sql = `
    INSERT INTO corpse(id, name, datamortis, gender, nationality, coffin_id)
    VALUES(
      null,
      ${this.connection.escape(CorpseEntity.name)},
      ${this.connection.escape(CorpseEntity.datamortis)},
      ${this.connection.escape(CorpseEntity.gender)},
      ${this.connection.escape(CorpseEntity.nationality)},
      ${this.connection.escape(CorpseEntity.coffin_id)}
    )`;
    const [result] = await this.connection.query(sql);
    return result.insertId;
  }
  async findById(id) {
    const sql = `
    SELECT * FROM corpse WHERE id = ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result[0];
  }
  async findAll() {
    const sql = ` SELECT * FROM corpse`;
    const [result] = await this.connection.query(sql);
    return result;
  }
  async update(CorpseEntity) {
    const sql = `UPDATE corpse SET name =${this.connection.escape(
      CorpseEntity.name,
    )},
    datamortis =  ${this.connection.escape(CorpseEntity.datamortis)},
    gender =  ${this.connection.escape(CorpseEntity.gender)},
    nationality =  ${this.connection.escape(CorpseEntity.nationality)},
    coffin_id = ${this.connection.escape(CorpseEntity.coffin_id)}
    `;
    const [result] = await this.connection.query(sql);
    return result.changedRows === 1;
  }
  async delete(id) {
    const sql = `DELETE FROM corpse WHERE id =  ${this.connection.escape(id)}`;
    const [result] = await this.connection.query(sql);
    return result;
  }
};