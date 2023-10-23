const jwt = require('jsonwebtoken'); // Add the JWT library
require('dotenv').config();
const {JWT_SECRET} = process.env;



// Define middleware to verify and decode the JWT
function verifyToken(req, res, next) {
  // const token = req.headers.authorization;
const token = req.headers["authorization"].replace(/^Bearer\s/, "");

  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    console.log(err);
   // console.log(token);
    //console.log(JWT_SECRET);

    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    

    console.log('Decoded token data:', decoded);
    
    req.userId = decoded.UserID;
    req.email = decoded.Email;


    next();
  });
}


const authenticate = verifyToken;


module.exports = { authenticate }








  