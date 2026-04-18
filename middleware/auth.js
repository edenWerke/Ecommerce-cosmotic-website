const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("\n=== AUTH MIDDLEWARE HIT ===");

  const authHeader = req.header("Authorization");

  console.log("RAW AUTH HEADER:", authHeader);

  if (!authHeader) {
    console.log("❌ NO AUTH HEADER FOUND");
    return res.status(401).json({ message: "No token provided" });
  }

  // Check format
  const parts = authHeader.split(" ");
  console.log("HEADER PARTS:", parts);

  if (parts.length !== 2) {
    console.log("❌ INVALID FORMAT (Expected: Bearer TOKEN)");
    return res.status(401).json({ message: "Token format invalid" });
  }

  const token = parts[1];

  console.log("EXTRACTED TOKEN:", token);

  try {
    const verified = jwt.verify(token, "secretkey");

    console.log("✅ TOKEN VERIFIED:", verified);

    req.user = verified;

    console.log("=== AUTH SUCCESS ===\n");

    next();
  } catch (err) {
    console.log("❌ JWT VERIFY ERROR:", err.message);
    console.log("=== AUTH FAILED ===\n");

    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = auth;