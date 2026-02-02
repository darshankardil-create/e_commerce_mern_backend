

import Schema from "./../Schema.js";
import jwt from "jsonwebtoken";

export async function authmiddleware(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") // headers: { Authorization: `Bearer ${token}` },
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //req on me split token out of it "bearer abcd1234"

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // decoded contains:
      // {
      //     "id": "69636a5fa7d06473f1e2ff92", payload
      //     "iat": 1768122975,    issued at :timestamps
      //     "exp": 1770714975       expiry
      // }

      req.authu = await Schema.findById(decoded.id).select("-password"); //give everyhing except password
      //  ⬆️
      // Middleware cannot directly send response for every route — some routes need the user info.
      // By attaching req.authuser, all routes downstream can access it:

      return next();
    } catch (error) {
      console.log("token verification failed", error);
      return res
        .status(401)
        .json({ message: "user is not authorize,token failed" });
    }
  }

  if (!token) {
    return res.status(404).json({ message: "token is not attached to headers authorization " });
  }
}



export function generateToken(id) {
  return jwt.sign({id} , process.env.JWT_SECRET, { expiresIn: "30d" }); //header includes algrithm and type:jwt/payload/sign
}
