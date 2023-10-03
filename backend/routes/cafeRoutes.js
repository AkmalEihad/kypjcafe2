const express = require('express')
const router = express.Router()
const cafeController = require('../controllers/cafeController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Specify the directory where uploaded files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Define the file name (you can customize this)
    },
});
const upload = multer({ storage: storage })

router.route('/')
    .get(cafeController.getAllCafe)
    //.post(cafeController.createNewCafe)
    .patch(cafeController.updateCafe)
    .delete(cafeController.deleteCafe)

//router dah betul
router.route('/upload')
    .post(upload.single('cafeImage'), cafeController.createNewCafe)


module.exports = router