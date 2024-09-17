//secure routes for the diff user by the jsonwebtoken (who have the json web token those have the access to the these routes)
import userModel from '../models/userModel.js';
import  JWT from 'jsonwebtoken';


//procted route token based
export const requireSignin = async (req,res,next) =>{
    try {
        const decode  =  JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

//create middleware for admin ,,in database when role =0 then thst is user,,when role=1=>admin
//Admin access
export const isAdmin = async(req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:"unAuthorized message"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            error,
            message:"error in isAdmin middleware"
        })
    }
}
