const router = require('express').Router()
const userCtrl = require('../controllers/UserCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/info', auth, userCtrl.getUserInfo)

router.get('/all_info', auth, authAdmin, userCtrl.getAllUserInfo)

router.get('/logout', auth, authAdmin, userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUserRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

module.exports = router