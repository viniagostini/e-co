const express = require('express')

const validate = require('express-validation')
const paramValidation = require('./comission.validator')

const comissionCtrl = require('./comission.controller')

const router = express.Router()

router
  .route('/')
  /** POST /api/comission - Create new comission */
  .post(validate(paramValidation.createComission), comissionCtrl.create)

  .get(comissionCtrl.getAll)

module.exports = router
