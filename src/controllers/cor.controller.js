import express from 'express';
import db from '../config/connection/db.js';

const { Request, Response } = express;

const CorController = {
  /**
   * @param {Request} request 
   * @param {Response} response 
   */
  async list(request, response) {
    const content = {
      success: false,
    };

    try {
      const cores = await db.cor.findAll();

      content.success = true;
      content.data = cores;
    } catch (error) {
      content.error = error;
      content.success = false;
    } finally {
      response.send(content);
    }
  },

  /**
   * @param {Request} request 
   * @param {Response} response 
   */
  async create(request, response) {
    const content = {
      success: false,
    };

    try {
      const { body } = request;

      if (!body) {
        throw 'Dados não enviados!';
      }

      if (!body.nome) {
        throw 'Nome da cor é de preenchimento obrigatório.';
      }

      const cor = await db.cor.create({
        NOME: body.nome,
        HEX: body.hex
      });

      content.success = true;
      content.result = cor;
    } catch (error) {
      content.success = false;
      content.error = error;
    } finally {
      response.send(content);
    }
  },

  /**
   * @param {Request} request 
   * @param {Response} response 
   */
  async update(request, response) {
    const content = {
      success: false,
    };

    try {
      const { body, params } = request;

      if (!body || !params) {
        throw 'Dados não enviados!';
      }

      if (!params.id) {
        throw 'Não foi possível encontrar o veículo desejado.';
      }

      if (!body.nome) {
        throw 'Nome da cor é de preenchimento obrigatório.';
      }

      const cor = await db.cor.findByPk(params.id);

      if (!cor) {
        throw `Cor ainda não cadastrada para o código ${params.id}.`;
      }

      cor.NOME = body.nome;
      cor.HEX = body.hex;

      await cor.save();

      content.success = true;
      content.result = cor;
    } catch (error) {
      content.success = false;
      content.error = error;
    } finally {
      response.send(content);
    }
  },

  /**
   * @param {Request} request 
   * @param {Response} response 
   */
  async delete(request, response) {
    const content = {
      success: false,
    };

    try {
      const { params } = request;

      if (!params) {
        throw 'Dados não enviados!';
      }

      if (!params.id) {
        throw 'Não foi possível encontrar o veículo desejado.';
      }

      const cor = await db.cor.findByPk(params.id);

      if (!cor) {
        throw `Cor ainda não cadastrada para o código ${params.id}.`;
      }

      await db.cor.destroy({ where: { ID: params.id } });

      content.success = true;
      content.result = cor;
    } catch (error) {
      content.success = false;
      content.error = error;
    } finally {
      response.send(content);
    }
  }
};

export default CorController;