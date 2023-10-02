const express = require('express')
const router = express.Router()
const customerController = require('../controllers/CustomerController')

router.route('/')
    .get(customerController.getAllCustomers)
    .post(customerController.createNewCustomer)
    .patch(customerController.updateCustomer)

module.exports = router