import { verifyToken } from "../utils/token.js";

function isLoggedInAPI(req, res, next) {
  const authorization = req.headers.authorization;
  console.log("authorization", authorization);

  if (!authorization) {
    return res.status(401).json({ error: "You shall not pass, you are not logged in" });
  }

  const parts = authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Malformed token" });
  }

  const token = parts[1];

  const result = verifyToken(token);
  console.log("token verified", result);

  if (result) {
    req.user = {
      id: result.id,
      role: result.role
    };
    return next();
  } else {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export { isLoggedInAPI };