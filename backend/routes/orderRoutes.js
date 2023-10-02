const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.route('/')
    .post(orderController.createOrder)

router.route('/:order_id')
    .get(orderController.getOrderById)
    .delete(orderController.cancelOrder)

router.route('/orderReceipt/:order_id')
    .get(orderController.getOrderDetailReceipt);


router.route('/pending/:order_id')
    .get(orderController.getOrderPending)

router.route('/confirmOrder')
    .post(orderController.confirmOrder)

module.exports = router