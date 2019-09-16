const express = require('express')

const validate = require('express-validation')
const paramValidation = require('./user.validator')

const userCtrl = require('./user.controller')

const router = express.Router()

router.route('/')
  /** POST /api/user - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create)

router.route('/:userDni')
  /** GET /api/user/:userDni - Get User by DNI */
  .get(userCtrl.getUserByDni)

  /**PATCH /api/user/:userDni - Update user by DNI */
  .patch(userCtrl.updateUser)


/** Load user when API with userId route parameter is hit */
router.param('userDni', userCtrl.load)

module.exports = router