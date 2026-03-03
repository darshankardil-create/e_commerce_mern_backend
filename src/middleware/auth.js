

import Schema from "./../Schema.js";
import jwt from "jsonwebtoken";

export async function authmiddleware(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; 

      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      req.authu = await Schema.findById(decoded.id).select("-password"); 


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
  return jwt.sign({id} , process.env.JWT_SECRET, { expiresIn: "30d" }); 
}
