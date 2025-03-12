import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express{
    interface Request{
      id:string;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        success:false,
        message:"User not authenticated"
      })
    }
    // verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
    // check is decoding was successful
    if(!decode){
      return res.status(200).json({
        success:false,
        message:"Invalid Token",
      })
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    next(error)
    return res.status(500).json({
      message:"Internal server error"
    })
  }
}