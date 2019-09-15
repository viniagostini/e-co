const {
  pick
} = require('ramda')

const User = require('./user.model')

/**
 * Load user and append to req.
 */
const load = async (req, res, next, id) => {
  try {
    const user = await User.get(id)
    req.queryUser = user
    return next()
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
  console.log(req.body)
  try {
    const userData = pick([
      'name', 'dni', 'state', 'interests', 'politicalParty'
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
  load,
  create
}