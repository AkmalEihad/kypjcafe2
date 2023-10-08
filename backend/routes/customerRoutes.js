const express = require('express')
const router = express.Router()
const customerController = require('../controllers/CustomerController')

router.route('/')
    .get(customerController.getAllCustomers)
    .post(customerController.createNewCustomer)
    .patch(customerController.updateCustomer)

router.route('/:customer_id')
    .get(customerController.getCustomerById)

module.exports = router