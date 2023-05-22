import express from 'express';
import db from '../config/connection/db.js';

const { Request, Response } = express;

const ModeloController = {
  /**
   * @param {Request} request 
   * @param {Response} response 
   */
  async list(request, response) {
    const content = {
      success: false,
    };

    try {
      const modelos = await db.modelo.findAll();

      content.success = true;
      content.data = modelos;
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

      const { descricao, ano, polegada_roda, peso, marca_id } = body;

      if (!marca_id) {
        throw 'O modelo deve pertencer a alguma marca.';
      }

      if (!descricao) {
        throw 'Nome do modelo é de preenchimento obrigatório.';
      }

      const marca = await db.marca.findByPk(marca_id);

      if (!marca) {
        throw `Marca não cadastrada para o código ${marca_id}.`;
      }

      const modelo = await db.modelo.create({
        DESCRICAO: descricao,
        ANO: ano,
        POLEGADA_RODA: polegada_roda,
        PESO: peso,
        MARCA_ID: marca_id
      });

      content.success = true;
      content.result = modelo;
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

      const { id } = params;
      const { descricao, ano, polegada_roda, peso, marca_id } = body;

      if (!marca_id) {
        throw 'O modelo deve pertencer a alguma marca.';
      }

      if (!descricao) {
        throw 'Nome do modelo é de preenchimento obrigatório.';
      }

      const modelo = await db.modelo.findByPk(id);

      if (!modelo) {
        throw `Modelo ainda não cadastrada para o código ${id}.`;
      }

      const marca = await db.marca.findByPk(marca_id);

      if (!marca) {
        throw `Marca não cadastrada para o código ${marca_id}.`;
      }

      modelo.DESCRICAO = descricao;
      modelo.ANO = ano;
      modelo.POLEGADA_RODA = polegada_roda;
      modelo.PESO = peso;
      modelo.MARCA_ID = marca_id;

      await modelo.save();

      content.success = true;
      content.result = modelo;
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

      const { id } = params;

      if (!id) {
        throw 'Não foi possível encontrar o item desejado.';
      }

      const modelo = await db.modelo.findByPk(id);

      if (!modelo) {
        throw `Modelo ainda não cadastrado para o código ${id}.`;
      }

      await db.modelo.destroy({ where: { ID: id } });

      content.success = true;
      content.result = modelo;
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
  async show(request, response) {
    const content = {
      success: false,
    };

    try {
      const { params } = request;

      if (!params) {
        throw 'Dados não enviados!';
      }

      const { id } = params;

      if (!id) {
        throw 'Não foi possível encontrar o item desejado.';
      }

      const modelo = await db.modelo.findByPk(id);

      if (!modelo) {
        throw `Modelo ainda não cadastrada para o código ${id}.`;
      }

      content.success = true;
      content.result = modelo;
    } catch (error) {
      content.success = false;
      content.error = error;
    } finally {
      response.send(content);
    }
  }
};

export default ModeloController;