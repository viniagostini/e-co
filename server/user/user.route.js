const express = require('express')

const validate = require('express-validation')
const paramValidation = require('./user.validator')

const userCtrl = require('./user.controller')

const router = express.Router()

router.route('/')
  /** POST /api/user - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create)

module.exports = router