const Joi = require('joi');

module.exports = {
  // POST /api/auth
  login: {
    body: {
      dni: Joi.string().regex(/^([0-9]{0,}\-{0,})*$/).required(),
      password: Joi.string().required()
    }
  }
}