const express = require('express')
const app =  express()
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const { logger } = require('./middleware/logger')
require('dotenv').config()

//middleware
app.use(logger)
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/customer', require('./routes/customerRoutes'))
app.use('/cafe', require('./routes/cafeRoutes'))
app.use('/seller', require('./routes/sellerRoutes'))
app.use('/menu', require('./routes/menuRoutes'))
app.use('/order', require('./routes/orderRoutes'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(3500, () => {
    console.log('Server has started on port 3500')
})