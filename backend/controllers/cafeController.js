const asyncHandler = require("express-async-handler");
const pool = require("../config/dbConn");

const getAllCafe = asyncHandler(async (req, res) => {
	const allCafeQuery = "SELECT * FROM Cafe";
	const allCafe = await pool.query(allCafeQuery);

	if (!allCafe.rows.length) {
		return res.status(400).json({ message: "No cafe found" });
	}
	res.json(allCafe.rows);
});

const getCafeById = asyncHandler(async (req, res) => {
	const { seller_id } = req.params;

	const allCafeQuery = "SELECT * FROM Cafe WHERE seller_id = $1";
	const allCafe = await pool.query(allCafeQuery, [seller_id]);

	if (!allCafe.rows.length) {
		return res.status(400).json({ message: "No cafe found" });
	}
	res.json(allCafe.rows);
});

const createNewCafe = asyncHandler(async (req, res) => {
	try {
		const { cafe_name, cafe_location, seller_id, description } = req.body;
		const cafe_image_url = req.file.filename;
		const open = true;

		// Validate input data
		if (!cafe_name || !cafe_location || !seller_id || !description || !cafe_image_url) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Check for seller_id, 1 seller 1 cafe only
		const checkSellerQuery = "SELECT * FROM Cafe WHERE seller_id = $1";
		const checkSeller = await pool.query(checkSellerQuery, [seller_id]);
		if (checkSeller.rows.length > 0) {
			return res.status(409).json({ message: "The seller_id has been used" });
		}

		// Check for duplicate cafe name
		const duplicateQuery = "SELECT * FROM Cafe WHERE cafe_name = $1";
		const duplicateCafe = await pool.query(duplicateQuery, [cafe_name]);
		if (duplicateCafe.rows.length > 0) {
			return res.status(409).json({ message: "The cafe name has been used" });
		}

		// Create a new cafe
		const insertQuery = "INSERT INTO Cafe (cafe_name, cafe_location, seller_id, description, cafe_image_url, is_open) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
		const newCafe = await pool.query(insertQuery, [cafe_name, cafe_location, seller_id, description, cafe_image_url, open]);

		if (newCafe.rows.length > 0) {
			return res.status(201).json({ message: `New cafe ${cafe_name} created` });
		} else {
			return res.status(400).json({ message: "Invalid cafe data received" });
		}
	} catch (error) {
		console.error("Error creating cafe:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

const updateCafe = asyncHandler(async (req, res) => {
	const { cafe_id, cafe_name, cafe_location, description } = req.body;

	const cafe_image_url = req.file ? req.file.filename : null;

	// Confirm data
	if (!cafe_name || !cafe_location || !description) {
		return res.status(400).json({ message: "All fields are required" });
	}

	// Does cafe exist to update?
	const getCafeQuery = "SELECT EXISTS(SELECT 1 FROM Cafe WHERE cafe_id = $1) AS cafe_exists";
	const cafe = await pool.query(getCafeQuery, [cafe_id]);

	if (!cafe.rows[0].cafe_exists) {
		return res.status(404).json({ message: "Cafe not found" });
	}

	// Check for duplicate cafe name
	const duplicateQuery = "SELECT * FROM Cafe WHERE cafe_name = $1 AND cafe_id <> $2";
	const duplicate = await pool.query(duplicateQuery, [cafe_name, cafe_id]);

	if (duplicate.rows.length > 0) {
		return res.status(409).json({ message: "Duplicate cafe name" });
	}

	let query;
	let queryParams;

	if (cafe_image_url) {
		// Update both data and image
		query = "UPDATE Cafe SET cafe_name =$1, cafe_location = $2, description = $3, cafe_image_url = $4 WHERE cafe_id = $5 RETURNING *";
		queryParams = [cafe_name, cafe_location, description, cafe_image_url, cafe_id];
	} else {
		// Update only data
		query = "UPDATE Cafe SET cafe_name =$1, cafe_location = $2, description = $3 WHERE cafe_id = $4 RETURNING *";
		queryParams = [cafe_name, cafe_location, description, cafe_id];
	}

	const updatedCafe = await pool.query(query, queryParams);

	res.json({ message: `${cafe_name} updated` });
});



const updateOpenCafe = asyncHandler(async (req, res) => {
	try {
		const { is_open, seller_id } = req.body;

		// Update the "is_open" status in the database
		const updateStatusQuery = "UPDATE Cafe SET is_open = $1 WHERE seller_id = $2";
		const updateStatus = await pool.query(updateStatusQuery, [is_open, seller_id]);

		res.status(200).json({ message: `Cafe is now ${is_open ? "open" : "closed"}` });
	} catch (error) {
		console.error("Error updating cafe status:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

const deleteCafe = asyncHandler(async (req, res) => {
	const { cafe_id } = req.params;

	// Confirm data
	if (!cafe_id) {
		return res.status(400).json({ message: "Cafe ID Required" });
	}

	// Does the user exist to delete?
	const getCafeQuery = "SELECT * FROM Cafe WHERE cafe_id = $1";
	const caferesult = await pool.query(getCafeQuery, [cafe_id]);

	const cafe = caferesult.rows[0]; // Get name

	if (!cafe) {
		return res.status(404).json({ message: "Cafe not found" });
	}

	// Delete hotel
	const resultQuery = "DELETE FROM Cafe WHERE cafe_id = $1 RETURNING *";
	const result = await pool.query(resultQuery, [cafe_id]);

	const reply = `Cafe ${cafe.cafe_name} with ID ${cafe_id} deleted`;

	res.json(reply);
});

module.exports = {
	getAllCafe,
	getCafeById,
	createNewCafe,
	updateCafe,
	updateOpenCafe,
	deleteCafe,
};
