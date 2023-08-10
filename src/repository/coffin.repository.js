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
      ${this.connection.escape(CoffinEntity.tomb)}
      ${this.connection.escape(CoffinEntity.tumulus)}
    )  
  `;
    console.log(await this.connection.query(sql));
    const [result] = await this.connection.query(sql);
    return result.affectedRows === 1;
  }
}