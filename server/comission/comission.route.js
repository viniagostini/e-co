const express = require('express')

const expressJwt = require('express-jwt')
const authCtrl = require('../auth/auth.controller')
const config = require('../../config/config')

const validate = require('express-validation')
const paramValidation = require('./comission.validator')

const comissionCtrl = require('./comission.controller')

const router = express.Router()

router
  .route('/')
  /** POST /api/comission - Create new comission */
  .post(expressJwt({ secret: config.jwtSecret }), authCtrl.checkCongressPerson, validate(paramValidation.createComission),  comissionCtrl.create)

  .get(comissionCtrl.getAll)

module.exports = router
