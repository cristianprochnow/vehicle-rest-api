import express from 'express';
import db from '../config/connection/db.js';
import { apenasNumeros } from '../utils/text.js';

const { Request, Response } = express;

const MarcaController = {
  /**
   * @param {Request} request 
   * @param {Response} response 
   */
  async list(request, response) {
    const content = {
      success: false,
    };

    try {
      const marcas = await db.marca.findAll();

      content.success = true;
      content.data = marcas;
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

      const { descricao, slogan, ano_criacao } = body;

      if (!descricao) {
        throw 'Nome da marca é de preenchimento obrigatório.';
      }

      if (apenasNumeros(ano_criacao) != ano_criacao) {
        throw 'Permitido apenas o envio de números no campo de ano.';
      }

      const marca = await db.marca.create({
        DESCRICAO: descricao,
        SLOGAN: slogan,
        ANO_CRIACAO: ano_criacao
      });

      content.success = true;
      content.result = marca;
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
      const { descricao, slogan, ano_criacao } = body;

      if (!id) {
        throw 'Não foi possível encontrar o item desejado.';
      }

      if (!descricao) {
        throw 'Nome da cor é de preenchimento obrigatório.';
      }

      if (apenasNumeros(ano_criacao) != ano_criacao) {
        throw 'Permitido apenas o envio de números no campo de ano.';
      }

      const marca = await db.marca.findByPk(id);

      if (!marca) {
        throw `Marca ainda não cadastrada para o código ${id}.`;
      }

      marca.DESCRICAO = descricao;
      marca.SLOGAN = slogan;
      marca.ANO_CRIACAO = ano_criacao;

      await marca.save();

      content.success = true;
      content.result = marca;
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

      const marca = await db.marca.findByPk(id);

      if (!marca) {
        throw `Marca ainda não cadastrada para o código ${id}.`;
      }

      await db.marca.destroy({ where: { ID: id } });

      content.success = true;
      content.result = marca;
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

      const marca = await db.marca.findByPk(id);

      if (!marca) {
        throw `Marca ainda não cadastrada para o código ${id}.`;
      }

      content.success = true;
      content.result = marca;
    } catch (error) {
      content.success = false;
      content.error = error;
    } finally {
      response.send(content);
    }
  }
};

export default MarcaController;