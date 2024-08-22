import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';

import Token from '../model/token.js'

dotenv.config();
 export const signupUser = async (req, res) => {
  try {

    // const salt =await bcrypt.genSalt();
    // const hashedPassword= await bcrypt.hash(request.body.password, salt);
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const loginUser =async(request,response)=>{
  let user =await User.findOne({username:request.body.username});
  if(!user){
    return response.status(400).jon({msg:'Username does not exist'});
  }
  try{
   let match= await compare(request.body.password, user.password );
   if(match){
      const accessToken= jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn :'15m'})
      const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

   }else{
   return response.status(400).json({msg:'Password does not match'})
   }
  }catch(error){
    
  }
}

// export default signupUser;
