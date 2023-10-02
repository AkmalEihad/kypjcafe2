const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menuController')

router.route('/')
    .post(menuController.createItemBasedCafe)
    .patch(menuController.updateItem)
    .delete(menuController.deletItem)

router.route('/:cafe_id')
    .get(menuController.getAllItemBasedCafe)

module.exports = router