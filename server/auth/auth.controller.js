const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
const ErrorMessages = require('../helpers/ErrorMessages')
const config = require('../../config/config')

const User = require('../user/user.model')

/**
 * Returns jwt token if valid dni and password is provided
 */
const login = async (req, res, next) => {
  try{
    const { dni, password } = req.body
    const user = await User.getByDNI(dni)
    if (user && dni === user.dni && user.comparePassword(password, user.password)) {
      const token = jwt.sign({
        name: user.name,
        _id: user._id,
        email: user.email,
        dni: user.dni,
        isCongressPerson: user.isCongressPerson
      }, config.jwtSecret)
      return res.json({
        token,
        userId: user._id
      })
    } else {
      const err = new APIError(ErrorMessages.INVALID_EMAIL_OR_PASSWORD, httpStatus.UNAUTHORIZED, true)
      return next(err)
    }
  } catch(error) {
    const err = new APIError(error, httpStatus.BAD_REQUEST)
    return next(err)
  }
}

const checkUser = (req, res, next) => {
  if (String(req.user.dni) === String(req.queryUser.dni)) {
    next()
  } else {
    const err = new APIError(ErrorMessages.FORBIDDEN_DEFAULT, httpStatus.FORBIDDEN, true)
    next(err)
  }
}

const checkCongressPerson = (req, res, next) => {
  if (req.user.isCongressPerson) {
    next()
  } else {
    const err = new APIError(ErrorMessages.ONLY_CONGRESSPERSON, httpStatus.UNAUTHORIZED, true)
    next(err)
  }
}

module.exports = { login, checkUser, checkCongressPerson }