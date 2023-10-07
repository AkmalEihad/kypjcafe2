const asyncHandler = require('express-async-handler');
const pool = require('../config/dbConn');

const getAllOrder = asyncHandler(async (req, res) => {
  const { seller_id } = req.params

  const allOrderQuery = 'SELECT m.item_id, m.item_name, m.price, o.order_id, o.order_date, oi.order_item_id, oi.quantity, c.name AS customer_name, cf.cafe_id, s.seller_id FROM Menu AS m INNER JOIN OrdersItems AS oi ON m.item_id = oi.item_id INNER JOIN Orders AS o ON oi.order_id = o.order_id INNER JOIN Customer AS c ON o.customer_id = c.customer_id INNER JOIN Cafe AS cf ON m.cafe_id = cf.cafe_id INNER JOIN Seller As s ON cf.seller_id = s.seller_id WHERE o.order_completed = true AND s.seller_id = $1';
  const allOrder = await pool.query(allOrderQuery,[seller_id])

  if (!allOrder.rows.length) {
    return res.status(400).json({ message: 'No order found' });
  }
  res.json(allOrder.rows);
})



const getOrderById = asyncHandler(async (req, res) => {
  const { order_id } = req.params
  const allOrderById = 'SELECT * FROM OrdersItems WHERE order_id = $1';
  const allOrder = await pool.query(allOrderById, [order_id])

  if (!allOrder.rows.length) {
    return res.status(400).json({ message: 'No order found' });
  }
  res.json(allOrder.rows);
})

const orderCompleted = asyncHandler(async (req, res) => {
  const {order_id} = req.params
  const order_completed = true

  //is order_id exist?
  const getOrder = 'SELECT * FROM orders WHERE order_id = $1 AND order_completed = false';
  const orderresult = await pool.query(getOrder, [order_id]);

  if (!orderresult.rows.length) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const completeQuery = 'UPDATE orders SET order_completed = $1 WHERE order_id = $2 RETURNING *'
  const complete = await pool.query(completeQuery, [order_completed, order_id])

  if (complete.rows.length > 0) {
    // Successfully inserted the order, now fetch and send the order details
    const orderQuery = 'SELECT * FROM orders WHERE order_id = $1';
    const order = await pool.query(orderQuery, [order_id]);

    res.status(201).json({ message: `Order ${order_id} completed`, order: order.rows });
  } else {
    res.status(400).json({ message: 'Invalid orders data received' });
  }
})

const createOrder = asyncHandler(async (req, res) => {
  const { customer_id } = req.body;
  const currentDate = new Date();
  const isoDateString = currentDate.toISOString();
  const orderStatus = "Pending";
  const orderCompleted = false

  // Insert into orders
  const insertOrdersQuery = 'INSERT INTO orders (customer_id, order_date, order_status, order_completed) VALUES ($1, $2, $3, $4) RETURNING *';
  const newOrders = await pool.query(insertOrdersQuery, [customer_id, isoDateString, orderStatus, orderCompleted]);

  if (newOrders.rows.length > 0) {
    // Successfully inserted the order, now fetch and send the order details
    const orderQuery = 'SELECT * FROM orders WHERE customer_id = $1';
    const order = await pool.query(orderQuery, [customer_id]);

    res.status(201).json({ message: `New orders from customer ${customer_id} created`, order: order.rows });
  } else {
    res.status(400).json({ message: 'Invalid orders data received' });
  }
});

const getOrderPending = asyncHandler(async (req, res) => {
  const { order_id } = req.params

  const resultQuery = 'SELECT * FROM orders WHERE order_id = $1 AND order_status = $2'
  const result = await pool.query(resultQuery, [order_id, 'Pending'])

  if (!result.rows.length) {
    return res.status(400).json({ message: 'No order pending on this ID found' });
  }
  res.json(result.rows);
})

const getOrderDetailReceipt = asyncHandler(async (req, res) => {
  const { order_id } = req.params;

  try {
    // Retrieve item details for the given item_id
    const itemsQuery = 'SELECT m.item_id,m.item_name,m.price,o.order_id,o.order_date,oi.order_item_id,oi.quantity FROM Menu AS m INNER JOIN OrdersItems AS oi ON m.item_id = oi.item_id INNER JOIN Orders AS o ON oi.order_id = o.order_id WHERE o.order_id = $1';
    const itemsResult = await pool.query(itemsQuery, [order_id]);

    if (!itemsResult.rows.length) {
      return res.status(400).json({ message: 'No data found for this order ID' });
    }

    // Send the response with the order date and item details
    res.json(itemsResult.rows);
  } catch (error) {
    console.error('Error fetching order detail receipt:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getOrderDetailForSeller = asyncHandler(async (req, res) => {
    // Retrieve item details for the given item_id
    const itemsQuery = 'SELECT m.item_id,m.item_name,m.price,o.order_id,o.order_date,oi.order_item_id,oi.quantity,c.name AS customer_name FROM Menu AS m INNER JOIN OrdersItems AS oi ON m.item_id = oi.item_id INNER JOIN Orders AS o ON oi.order_id = o.order_id INNER JOIN Customer AS c ON o.customer_id = c.customer_id WHERE o.order_completed = false';
    const itemsResult = await pool.query(itemsQuery);

    if (!itemsResult.rows.length) {
      return res.status(400).json({ message: 'No order yet' });
    }

    if (!itemsResult.rows.length) {
      return res.status(400).json({ message: 'No order found' });
    }
    res.json(itemsResult.rows);
});


const confirmOrder = asyncHandler(async (req, res) => {
  const { order_id, items } = req.body;
  const orderStatus = "Confirm";


  if (!order_id || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data received' });
  }

  const client = await pool.connect();
  try {
    // Begin a transaction
    await client.query('BEGIN');

    // Update order status
    const confirmQuery = 'UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *';
    const confirm = await client.query(confirmQuery, [orderStatus, order_id]);

    // Insert multiple items into ordersitems in a single transaction
    for (const item of items) {
      const { item_id, quantity } = item;
      const insertQuery = 'INSERT INTO ordersitems (order_id, item_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const newOrder = await client.query(insertQuery, [order_id, item_id, quantity]);
    }

    // Commit the transaction
    await client.query('COMMIT');
    res.status(201).json({ message: `New order ${order_id} created` });
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Release the client back to the pool
    client.release();
  }
});


const cancelOrder = asyncHandler(async (req, res) => {
  const { order_id } = req.params

  // Confirm data
  if (!order_id) {
    return res.status(400).json({ message: 'order_item ID Required' })
  }

  // Does the user exist to delete?
  const getOrder = 'SELECT * FROM ordersitems WHERE order_id = $1';
  const orderresult = await pool.query(getOrder, [order_id]);

  if (!orderresult.rows.length) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Delete hotel
  const resultQuery = 'DELETE FROM ordersitems WHERE order_id = $1 RETURNING *'
  const result = await pool.query(resultQuery, [order_id])

  const cancelQUery = 'DELETE FROM orders WHERE order_id = $1 RETURNING *'
  const cancel = await pool.query(cancelQUery, [order_id])

  const reply = `order with ID ${order_id} deleted`

  res.json(reply)
})

module.exports = {
  getAllOrder,
  getOrderById,
  orderCompleted,
  createOrder,
  getOrderPending,
  getOrderDetailReceipt,
  getOrderDetailForSeller,
  confirmOrder,
  cancelOrder
}