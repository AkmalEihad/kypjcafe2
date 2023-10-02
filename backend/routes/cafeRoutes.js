const express = require('express')
const router = express.Router()
const cafeController = require('../controllers/cafeController')

router.route('/')
    .get(cafeController.getAllCafe)
    .post(cafeController.createNewCafe)
    .patch(cafeController.updateCafe)
    .delete(cafeController.deleteCafe)

module.exports = router