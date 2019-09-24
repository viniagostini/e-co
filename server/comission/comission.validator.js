const Joi = require('joi')

module.exports = {
  // POST /api/user
  createComission: {
    body: {
      name: Joi.string().required(),
      congressPeople: Joi.array().items(Joi.string().regex(/^([0-9]{0,}\-{0,})*$/).required()).min(1),
    }
  },
}