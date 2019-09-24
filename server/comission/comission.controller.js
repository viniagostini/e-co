const {pick} = require('ramda')
const httpStatus = require('http-status')

const Comission = require('./comission.model')
const User = require('../user/user.model')

const APIError = require('../helpers/APIError')
const ErrorMessages = require('../helpers/ErrorMessages')


/**
 * Create new Comission
 */
const create = async (req, res, next) => {
  try {
    const userData = pick(
      ['name', 'congressPeople'],
      req.body,
    )

    const promises = userData.congressPeople.map(dni => User.getByDNI(dni))
    
    const users = await Promise.all(promises)
    
    const notCongressPeople = users.filter(user => !user || !user.isCongressPerson)
    
    if (notCongressPeople.length > 0) {
      next(new APIError(ErrorMessages.NOT_CONGRESSPERSON_IN_COMISSION, httpStatus.BAD_REQUEST, true))
    }

    const comission = new Comission(userData)
    const savedComission = await comission.save()
    res.json(savedComission)
  } catch (err) {
    next(err)
  }
}

/**
 * Get all comissions ordered by name
 */
const getAll = async (req, res, next) => {
  try {
    const comissions = await Comission.find({})
      .sort('name')
      .exec()
    res.json(comissions)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  create,
  getAll
}
