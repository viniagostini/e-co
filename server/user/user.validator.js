const Joi = require('joi')

module.exports = {
  // POST /api/user
  createUser: {
    body: {
      name: Joi.string().required(),
      dni: Joi.string().regex(/^([0-9]{0,}\-{0,})*$/).required(),
      state: Joi.string().required(),
      interests: Joi.string()
    }
  },
}