import jwt from 'jsonwebtoken'

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)

export default verifyToken
