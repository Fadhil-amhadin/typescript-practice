import { verifyToken } from "../helpers/jwt";
import { Request, Response, NextFunction } from "express";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { access_token, signature } = req.headers;

        if(!access_token){
            res.status(403).send("Unauthorized")
        }
        if(!signature || signature !== 'midasfooddelivery'){
            res.status(403).send('Unauthorized')
        }

        const user = verifyToken(access_token)
        const userId = user.userId

        req.body = {
            userId
        }
        
        next()
    } catch (error) {
        next(error)
    }
}

export default authentication;