'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
	vendedor () {
		return this.belongsTo('App/Models/User');
	}
}

module.exports = Cliente
