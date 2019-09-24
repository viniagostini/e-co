const express = require('express')

const userRoutes = require('./server/user/user.route')
const politicalPartyRoutes = require('./server/politicalParty/politicalParty.route')
const comissionRoutes = require('./server/comission/comission.route')
const authRoutes = require('./server/auth/auth.route')

const router = express.Router()

router.use('/user', userRoutes)
router.use('/politicalParty', politicalPartyRoutes)
router.use('/comission', comissionRoutes)
router.use('/auth', authRoutes)

module.exports = router
