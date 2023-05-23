import express from 'express';
import db from '../config/connection/db.js';
import { requestDataCreation, responseErrorCreation } from '../types/car.js';

const { Request, Response } = express;

const VeiculoController = {
  /**
   * @param {Request} request 
   * @param {Response} response 
   */
  async list(request, response) {
    const content = {
      success: false,
    };

    try {
      const { query } = request;
      const { placa } = query;

      const where = {};

      if (placa) {
        where.placa = placa;
      }

      const veiculos = await db.veiculo.findAll({
        where
      });

      content.success = true;
      content.data = veiculos;
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

      const { placa, renavam, cor_id, modelo_id } = body;

      const validation = validate({
        placa,
        renavam,
        cor_id,
        modelo_id
      });

      if (!validation.success) {
        throw validation.error;
      }

      const modelo = await db.modelo.findByPk(modelo_id);

      if (!modelo) {
        throw `Modelo não cadastrada para o código ${modelo_id}.`;
      }

      const cor = await db.cor.findByPk(cor_id);

      if (!cor) {
        throw `Cor não cadastrada para o código ${cor_id}.`;
      }

      const veiculo = await db.veiculo.create({
        PLACA: placa,
        RENAVAM: renavam,
        COR_ID: cor_id,
        MODELO_ID: modelo_id
      });

      content.success = true;
      content.result = veiculo;
    } catch (error) {
      console.log(error);
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
      const { placa, renavam, cor_id, modelo_id } = body;

      const validation = validate({
        placa,
        renavam,
        cor_id,
        modelo_id
      });

      if (!validation.success) {
        throw validation.error;
      }

      const modelo = await db.modelo.findByPk(modelo_id);

      if (!modelo) {
        throw `Modelo não cadastrada para o código ${modelo_id}.`;
      }

      const cor = await db.cor.findByPk(cor_id);

      if (!cor) {
        throw `Cor não cadastrada para o código ${cor_id}.`;
      }

      const veiculo = await db.veiculo.findByPk(id);

      if (!veiculo) {
        throw `Veículo não cadastrado para o código ${id}.`;
      }

      veiculo.PLACA = placa;
      veiculo.RENAVAM = renavam;
      veiculo.COR_ID = cor_id;
      veiculo.MODELO_ID = modelo_id;

      await veiculo.save();

      content.success = true;
      content.result = veiculo;
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

      const veiculo = await db.veiculo.findByPk(id);

      if (!veiculo) {
        throw `Veículo ainda não cadastrado para o código ${id}.`;
      }

      await db.veiculo.destroy({ where: { ID: id } });

      content.success = true;
      content.result = veiculo;
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

      const veiculo = await db.veiculo.findByPk(id);

      if (!veiculo) {
        throw `Veículo ainda não cadastrado para o código ${id}.`;
      }

      content.success = true;
      content.result = veiculo;
    } catch (error) {
      content.success = false;
      content.error = error;
    } finally {
      response.send(content);
    }
  }
};

export default VeiculoController;

/**
 * @param {requestDataCreation} params 
 * @returns {responseErrorCreation}
 */
function validate(params) {
  const response = {
    success: true,
    error: ''
  };

  try {
    if (!params.placa) {
      throw 'Informação de placa é obrigatória.';
    }

    if (!params.renavam) {
      throw 'Informação de Renavam é obrigatória.'
    }

    if (params.renavam.length < 11) {
      throw 'Renavam inserido com formato inválido.';
    }

    if (!params.cor_id) {
      throw 'Veículo precisa ter alguma cor relacionada.';
    }
    
    if (!params.modelo_id) {
      throw 'Veículo precisa ter algum modelo relacionado.';
    }
  } catch (error) {
    response.success = false;
    response.error = error;
  } finally {
    return response;
  }
}