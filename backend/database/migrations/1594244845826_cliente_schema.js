'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('nome').notNullable()
      table.bigint('cpf', 11).notNullable().unique()
      table.date('data_nascimento').notNullable()
      table.bigint('telefone').notNullable()
      table.integer('cep', 8).notNullable()
      table.string('rua').notNullable()
      table.integer('numero').notNullable()
      table.string('complemento')
      table.string('bairro').notNullable()
      table.string('cidade').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
