const express = require('express')
const router = express.Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order')
const File = require('../models/File')

const storageEngine = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, callback) {
        callback (
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})

const upload = multer({
    storage: storageEngine
})

router.post('/', upload.single('file'), (req, res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const file = req.body.file
    const qty = req.body.qty
    const status = req.body.status

    const newOrderData = {
        firstName,
        lastName,
        email,
        file,
        qty,
        status
    }

    const newOrder = new Order(newOrderData)

    newOrder.save()
        // .then(() => res.json())
        .catch(err => res.status(400).json('Error: ' + err))
    
})

router.get('/test', (req, res) => res.json({msg: 'back-end working.'}))

// GET route for orders api
router.get('/', (req, res) => {
    Order.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'No Orders Yet.'}))
})

// POST route for new order
// router.post('/', (req, res) => {
//     const newOrder = new Order({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         file: req.body.file,
//         qty: req.body.qty,
//         status: req.body.status
//     })
//     newOrder.save().then(info => res.json(info))
// })

// DELETE route for orders
router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, deleteOrder) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deleteOrder)
    })
})

// UPDATE route for orders
router.put('/:id', (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedOrder) => {
        if (err) {
          res.status(400).json({ error: err.message })
        }
        res.status(200).json(updatedOrder)
    })
})

module.exports = router