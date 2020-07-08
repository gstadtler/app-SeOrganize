'use strict'

const Cliente = use("App/Models/Cliente");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const clientes = await Cliente.query()
      .with('vendedor')
      .fetch();
    return clientes;
  }

  /**
   * Create/save a new cliente.
   * POST clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only([
      'nome',
      'cpf',
      'data_nascimento',
      'telefone',
      'cep',
      'rua',
      'numero',
      'complemento',
      'bairro',
      'cidade'
    ]);
    const cliente = await Cliente.create({ user_id: auth.user.id, ...data });

    return cliente;
  }

  /**
   * Display a single cliente.
   * GET clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const cliente = await Cliente.findOrFail(params.id);
    return cliente;
  }

  /**
   * Update cliente details.
   * PUT or PATCH clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const cliente = await Cliente.findOrFail(params.id);
    const data = request.only([
      'telefone',
      'cep',
      'rua',
      'numero',
      'complemento',
      'bairro',
      'cidade'
    ]);
    
    cliente.merge(data);
    await cliente.save();
    
    return cliente
  }

  /**
   * Delete a cliente with id.
   * DELETE clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const cliente = await Cliente.findOrFail(params.id);
    if (cliente.user_id != auth.user.id) {
      return response.status(401);
    }
    await cliente.delete();
  }
}

module.exports = ClienteController
