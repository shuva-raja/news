const jwt = require("jsonwebtoken");
const secretKey = "shuvajitda"; // Replace with your actual secret key

const verify = (req, res, next) => {
  const authToken = req.cookies.authToken; // Assuming the token is sent in the 'Authorization' header
  console.log(authToken);
  if (!authToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(authToken, secretKey);
    req.userId = decodedToken.userId; // Store the user ID in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(401).send("Unauthorized");
  }
};

module.exports = verify;
