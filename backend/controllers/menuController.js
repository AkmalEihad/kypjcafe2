const asyncHandler = require('express-async-handler');
const pool = require('../config/dbConn');

const getAllItemBasedCafe = asyncHandler(async (req, res) => {
    const { cafe_id, seller_id } = req.params;

    // Check if either cafe_id or seller_id is provided in the request params
    if (!cafe_id && !seller_id) {
        return res.status(400).json({ message: 'Please provide cafe_id or seller_id' });
    }

    let query;
    let queryParams;

    if (cafe_id) {
        query = 'SELECT * FROM Menu WHERE cafe_id = $1';
        queryParams = [cafe_id];
    } else if (seller_id) {
        // Add logic for seller_id if needed
        query = 'SELECT M.*, C.cafe_id FROM Menu AS M INNER JOIN Cafe AS C ON M.cafe_id = C.cafe_id WHERE C.seller_id = $1';
        queryParams = [seller_id];
    }

    const allItemBasedCafe = await pool.query(query, queryParams);

    if (!allItemBasedCafe.rows.length) {
        return res.status(400).json({ message: 'No item found' });
    }

    res.json(allItemBasedCafe.rows);
});

const getItemBasedItemId = asyncHandler(async (req, res) => {
    const { item_id } = req.params

    const getItemQuery = 'SELECT * FROM Menu WHERE item_id = $1'
    const getItem = await pool.query(getItemQuery, [item_id])

    if (!getItem.rows.length) {
        return res.status(400).json({ message: 'No item found' });
    }

    res.json(getItem.rows)
})


const createItemBasedCafe = asyncHandler(async (req, res) => {
    const { item_name, categories, price, cafe_id, item_image_url } = req.body;
    const available = true;

    // Confirm data
    if (!item_name || !categories || !price || !cafe_id || !item_image_url) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate username
    const duplicateQuery = 'SELECT * FROM Menu WHERE item_name = $1 AND cafe_id = $2';
    const duplicateItem = await pool.query(duplicateQuery, [item_name, cafe_id]);

    if (duplicateItem.rows.length > 0) {
        return res.status(409).json({ message: 'The item name has been used' });
    }

    // Create new user
    const insertQuery = 'INSERT INTO Menu (item_name, categories, price, cafe_id, item_image_url, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const newItem = await pool.query(insertQuery, [item_name, categories, price, cafe_id, item_image_url, available]);

    if (newItem.rows.length > 0) {
        res.status(201).json({ message: `New item ${item_name} created` });
    } else {
        res.status(400).json({ message: 'Invalid item data received' });
    }
})

const updateItem = asyncHandler(async (req, res) => {
    const { item_id, item_name, categories, price, is_available } = req.body;
    const item_image_url = req.file ? req.file.filename : null; // Handle when a file is not provided
    
    // Confirm data
    if (!item_name || !categories || !price || !item_id || !is_available) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Does item exist to update?
    const getMenuQuery = 'SELECT * FROM Menu WHERE item_id = $1';
    const item = await pool.query(getMenuQuery, [item_id]);

    if (!item.rows.length > 0) {
        return res.status(404).json({ message: 'Item not found' });
    }

    let query;
    let queryParams;

    if (item_image_url) {
        // Update both data and image
        query = 'UPDATE Menu SET item_name = $1, categories = $2, price = $3, item_image_url = $4, is_available = $5 WHERE item_id = $6 RETURNING *';
        queryParams = [item_name, categories, price, item_image_url, is_available, item_id];
    } else {
        // Update only data
        query = 'UPDATE Menu SET item_name = $1, categories = $2, price = $3, is_available = $4 WHERE item_id = $5 RETURNING *';
        queryParams = [item_name, categories, price, is_available, item_id];
    }

    // Update the item
    const updatedItem = await pool.query(query, queryParams);

    res.json({ message: `${item_name} updated` });
});


const deletItem = asyncHandler(async (req, res) => {
    const { item_id } = req.body

    // Confirm data
    if (!item_id) {
        return res.status(400).json({ message: 'Item ID Required' })
    }

    // Does the user exist to delete?
    const getItemQuery = 'SELECT * FROM Menu WHERE item_id = $1';
    const itemResult = await pool.query(getItemQuery, [item_id]);

    const item = itemResult.rows[0] // Get name

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    // Delete hotel
    const resultQuery = 'DELETE FROM Menu WHERE item_id = $1 RETURNING *'
    const result = await pool.query(resultQuery, [item_id])

    const reply = `Item ${item.item_name} with ID ${item_id} deleted`

    res.json(reply)
})

module.exports = {
    getAllItemBasedCafe,
    getItemBasedItemId,
    createItemBasedCafe,
    updateItem,
    deletItem
}