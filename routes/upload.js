const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload file

router.post('/upload', (req, res) => {
    try {
        console.log(req.files)
        // res.json('test upload')
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.')
        }
        const file = req.files.file
        if (file.size > 5242880) {
            return res.status(400).json({msg: "File size too large"})
        }
        if (file.mimetype !== 'model/stl') {
            return res.status(400).json({msg: "File type not valid"})
        }

        // cloudinary.v2.uploader.upload(file.tempFilePath, {folder: 'test'}, async(err, result) => {
        //     if (err) console.log(err);
        //     res.json({result})
        // })

        cloudinary.v2.uploader.upload(file.tempFilePath, {resource_type: "raw", folder: 'test'})
        .then((result) => {
            console.log('success', JSON.stringify(result, null, 2))
            res.json({result})
        })
        .catch((error) => {
            console.log(error, JSON.stringify(result, null, 2))
        })
         

    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

module.exports = router