const Joi = require('joi')

module.exports = {
  // POST /api/user
  createPoliticalParty: {
    body: {
      name: Joi.string().required(),
    },
  },
}
