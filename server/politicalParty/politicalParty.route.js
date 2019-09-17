const express = require('express')

const validate = require('express-validation')
const paramValidation = require('./politicalParty.validator')

const politicalPartyCtrl = require('./politicalParty.controller')

const router = express.Router()

router
  .route('/')
  /** POST /api/politicalParty - Create new user */
  .post(
    validate(paramValidation.createPoliticalParty),
    politicalPartyCtrl.create,
  )

  /** GET /api/politicalParty - Get all political parties */
  .get(politicalPartyCtrl.getAll)

module.exports = router
