const asyncHandler = require('express-async-handler');
const pool = require('../config/dbConn');

const getAllCustomers = asyncHandler(async (req, res) => {
    const allCustQuery = 'SELECT * FROM Customer';
    const allCust = await pool.query(allCustQuery)

    if (!allCust.rows.length) {
		return res.status(400).json({ message: 'No customer found' });
	}
	res.json(allCust.rows);
})

const getCustomerById = asyncHandler(async (req, res) => {
	const {customer_id} = req.params

	const allCustQuery = 'SELECT * FROM Customer WHERE customer_id = $1';
    const allCust = await pool.query(allCustQuery, [customer_id])

    if (!allCust.rows.length) {
		return res.status(400).json({ message: 'No customer found' });
	}
	res.json(allCust.rows);
})

const createNewCustomer = asyncHandler(async (req, res) => {
	const { name, username, password, email, faculty } = req.body;

    // Confirm data
	if (!name || !username || !password || !email || !faculty) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// Check for duplicate username
	const duplicateQuery = 'SELECT * FROM Customer WHERE username = $1';
	const duplicateCustomer = await pool.query(duplicateQuery, [username]);

	if (duplicateCustomer.rows.length > 0) {
        return res.status(409).json({ message: 'The username has been used' });
    }

    // Create new user
    const insertQuery = 'INSERT INTO Customer (name, username, password, email, faculty) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const newCustomer = await pool.query(insertQuery, [name, username, password, email, faculty]);

    if (newCustomer.rows.length > 0) {
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});



// @desc Update a user
// @route PATCH /users
// @access Private
const updateCustomer = asyncHandler(async (req, res) => {
	const { customer_id, name, username, password, email, faculty } = req.body;

	// Confirm data
	if (!username || !name || !password || !email || !faculty) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// Does user exist to update?
	const getCustomerQuery = 'SELECT * FROM Customer WHERE customer_id = $1';
	const customer = await pool.query(getCustomerQuery, [customer_id]);

	if (!customer.rows.length > 0) {
		return res.status(404).json({ message: 'Customer not found' });
	}

	// Check for duplicate usernames
	const duplicateQuery = 'SELECT * FROM Customer WHERE username = $1 AND customer_id <> $2';
	const duplicate = await pool.query(duplicateQuery, [username, customer_id]);

	if (duplicate.rows.length > 0) {
		return res.status(409).json({ message: 'Duplicate username' });
	}

	// Update the user
	const updateCustomerQuery = 'UPDATE Customer SET username = $1, password = $2, email = $3, faculty = $4, name = $5 WHERE customer_id = $6 RETURNING *';
	const updatedCustomer = await pool.query(updateCustomerQuery, [username, password, email, faculty, name, customer_id]);

	res.json({ message: `${username} updated` });
});

module.exports = {
    getAllCustomers,
	getCustomerById,
    createNewCustomer,
    updateCustomer
}