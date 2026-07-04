const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
    console.log("req.headers", req.headers);
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("token", token)
    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (error) {
        console.log("Error while verifying token", error.message)
        return res.status(401).json({ message: "Invalid token provided" })
    }
}

module.exports = { verifyJWT }