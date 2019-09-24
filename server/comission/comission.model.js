const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
const ErrorMessages = require('../helpers/ErrorMessages')

const DUPLICATED_KEY_MONGO_ERROR_CODE = 11000

/**
 * Comission Schema
 */
const ComissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  congressPeople: [
    {
      type: String
    },
  ],
})

ComissionSchema.post('save', function(error, _, next) {
  if (
    error.name === 'MongoError' &&
    error.code === DUPLICATED_KEY_MONGO_ERROR_CODE
  ) {
    const message = ErrorMessages.DUPLICATED_COMISSION_NAME
    next(new APIError(message, httpStatus.CONFLICT, true))
  } else {
    next(error)
  }
})

module.exports = mongoose.model('Comission', ComissionSchema)
