import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('phone_number').notNullable().unique()

      table
        .enum('gender', ['male', 'female'])
        .notNullable()

      table
        .enum('role', ['admin', 'user'])
        .notNullable()
        .defaultTo('user')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('phone_number')
      table.dropColumn('gender')
      table.dropColumn('role')
    })
  }
}

