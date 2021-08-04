const express = require('express')
const router = express.Router()

const Order = require('../../models/Order')

router.get('/test', (req, res) => res.json({msg: 'back-end working.'}))

// GET route for orders api
router.get('/', (req, res) => {
    Order.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'No Orders Yet.'}))
})

// POST route for new order
router.post('/', (req, res) => {
    const newOrder = new Order({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        file: req.body.file
    })
    newOrder.save().then(info => res.json(info))
})

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
router.post('/update/:id', (req, res) => {
    Order.findOneAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                file: req.body.file
            },

        },
        {new: true},
    )
        .then(info => {
            res.json(info)
        })
        .catch(err => res.status(400).json({msg: 'update failed'}))
})

module.exports = router