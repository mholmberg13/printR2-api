const router = require('express').Router()
const userCtrl = require('../controllers/UserCtrl')

router.post('/register', userCtrl.register)
router.post('/activation', userCtrl.activateEmail)

module.exports = router