const express = require('express')

const validate = require('express-validation')
const paramValidation = require('./comission.validator')

const comissionCtrl = require('./comission.controller')

const router = express.Router()

router
  .route('/')
  /** POST /api/user - Create new user */
  .post(validate(paramValidation.createComission), comissionCtrl.create)

module.exports = router
