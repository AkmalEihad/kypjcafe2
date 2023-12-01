const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menuController')
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
    .get(menuController.getAllItem)
    .post(upload.single('itemImage'), menuController.createItemBasedCafe)
    .patch(upload.single('itemImage'), menuController.updateItem)

router.route('/:seller_id')
    .get(menuController.getAllItemBasedCafe)

router.route('/customerMenu/:cafe_id')
    .get(menuController.getAllItemBasedCafeCustomer)

router.route('/item/:item_id')
    .get(menuController.getItemBasedItemId)
    .delete(menuController.deletItem)

module.exports = router