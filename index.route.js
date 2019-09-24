const express = require('express')

const userRoutes = require('./server/user/user.route')
const politicalPartyRoutes = require('./server/politicalParty/politicalParty.route')
const comissionRoutes = require('./server/comission/comission.route')

const router = express.Router()

router.use('/user', userRoutes)
router.use('/politicalParty', politicalPartyRoutes)
router.use('/comission', comissionRoutes)

module.exports = router
