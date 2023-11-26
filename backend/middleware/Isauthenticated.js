const isAuthenticated = (req, res, next) => {
  const authToken = req.cookies.authToken;
  console.log(authToken);
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token here (e.g., using jwt.verify)
  // If the token is valid, call next()
  // Otherwise, return a 401 response

  next();
};
module.exports = isAuthenticated;
