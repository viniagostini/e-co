const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
const ErrorMessages = require('../helpers/ErrorMessages')

const DUPLICATED_KEY_MONGO_ERROR_CODE = 11000

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  interests: {
    type: [{
      type: String
    }]
  },
  politicalParty: {
    type: String
  },
  isCongressPerson: {
    type: Boolean,
    default: false
  },
  publicLifeStartingDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (errr, hash) => {
      user.password = hash
      next()
    })
  })
})

UserSchema.post('save', function (error, _, next) {
  if (error.name === 'MongoError' && error.code === DUPLICATED_KEY_MONGO_ERROR_CODE) {
    const message = ErrorMessages.DUPLICATED_DNI
    next(new APIError(message, httpStatus.CONFLICT, true))
  } else {
    next(error)
  }
})

UserSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.password
  }
}

UserSchema.method({
  comparePassword(reqPassword, userPassword) {
    return bcrypt.compareSync(reqPassword, userPassword)
  }
})

UserSchema.statics = {
  getByDNI(dni) {
    return this.findOne({
      dni
    }).exec()
  }
}

module.exports = mongoose.model('User', UserSchema)