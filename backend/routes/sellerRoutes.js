const express = require('express')
const router = express.Router()
const sellerController = require('../controllers/sellerController')

router.route('/')
    .get(sellerController.getAllSellers)
    .post(sellerController.createSeller)
    .patch(sellerController.updateSeller)

module.exports = router