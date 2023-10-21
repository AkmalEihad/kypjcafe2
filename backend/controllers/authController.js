const pool = require('../config/dbConn');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUserQuery = 'SELECT * FROM Customer WHERE username = $1'
    const foundUser = await pool.query(foundUserQuery, [username])

    if (foundUser.rowCount === 0) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const matchQuery = 'SELECT * FROM Customer WHERE password = $1'
    const match = await pool.query(matchQuery, [password]) 

    if (!match.rowCount > 0) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        //secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken, customer_id: foundUser.rows[0].customer_id })
})

const loginSeller = asyncHandler(async (req, res) => {
    const {username,password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUserQuery = 'SELECT * FROM Seller WHERE seller_username = $1'
    const foundUser = await pool.query(foundUserQuery, [username])

    if (foundUser.rowCount === 0) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const matchQuery = 'SELECT * FROM Seller WHERE seller_password = $1'
    const match = await pool.query(matchQuery, [password]) 

    if (!match.rowCount > 0) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        //secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken, seller_id: foundUser.rows[0].seller_id })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const foundUserQuery = 'SELECT * FROM Customer WHERE username = $1'
            const foundUser = await pool.query(foundUserQuery, [decodedToken.username])

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', /*secure: true*/ })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    loginSeller,
    refresh,
    logout
}