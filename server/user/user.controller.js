const {
  pick
} = require('ramda')
const httpStatus = require('http-status')

const { cache } = require('../../config/config')

const NodeCache = require( "node-cache" )
const userCache = new NodeCache()

const User = require('./user.model')

const APIError = require('../helpers/APIError')
const ErrorMessages = require('../helpers/ErrorMessages')


const timer = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, time)
  })
}

/**
 * Load user and append to req.
 */
const load = async (req, res, next, dni) => {
  try {
    const cachedUser = userCache.get(dni)
    if (cache && cachedUser) {
      req.queryUser = cachedUser 
    } else {
      await timer(500)
      const user = await User.getByDNI(dni)
      req.queryUser = user
      if (user) {
        userCache.set(dni, user)
      }
    }
    return next()
  } catch (err) {
    next(err)
  }
}

/**
 * Get user by DNI
 */
const getUserByDni = (req, res, next) => {
  if (!req.queryUser) {
    return next(new APIError(ErrorMessages.USER_NOT_FOUND, httpStatus.NOT_FOUND, true))
  }
  res.json(req.queryUser)
}

const inFuture = d => {
  return d.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)
}


/** 
 * Edit a User
 */
const updateUser = async (req, res, next) => {
  const user = req.queryUser

  const userData = pick([
    'name', 'state', 'interests', 'politicalParty'
  ], req.body)

  let editedUser = Object.assign(user, userData)

  let publicLifeStartingDate

  if (req.body.publicLifeStartingDate) {
    if (!editedUser.politicalParty) {
      return next(new APIError(ErrorMessages.CONGRESSPERSON_WITHOUT_POLITICAL_PARTY, httpStatus.BAD_REQUEST, true))
    }

    const [day, month, year] = req.body.publicLifeStartingDate.split("-")
    const date = new Date(year, month - 1, day)
    if (inFuture(date)) {
      return next(new APIError(ErrorMessages.PUBLIC_LIFE_STARTING_DATE_IN_FUTURE, httpStatus.BAD_REQUEST, true))
    }

    publicLifeStartingDate = date
    editedUser.isCongressPerson = true
  }

  editedUser = Object.assign(editedUser, {
    publicLifeStartingDate
  })
  try {
    const savedUser = await editedUser.save()
    userCache.set(savedUser.dni, savedUser)
    res.json(savedUser)
  } catch (err) {
    next(err)
  }

}

/**
 * Create new user
 * 
 * @returns {User}
 */
const create = async (req, res, next) => {
  try {
    const userData = pick([
      'name', 'dni', 'password', 'state', 'interests', 'politicalParty'
    ], req.body)

    const {
      interests
    } = userData
    userData.interests = interests ? interests.split(',').map(i => i.trim()) : []

    const user = new User(userData)
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  getUserByDni,
  load,
  updateUser
}