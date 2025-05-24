
import AuthUser from '../../Models/authModel.js';
import bcrypt from 'bcrypt';
import { json } from 'express';
import jwt from 'jsonwebtoken';


const loginController = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();

    const userExist = await AuthUser.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: 'User deos not exists' });
    }
    const checkPassword = bcrypt.compareSync(req.body.password, userExist.password); // 1st user then db
    if(!checkPassword){ 
        return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({email:userExist.email}, process.env.MY_SECRET, {expiresIn:'7d'});
    res.cookie('token', token, {
        httpOnly: true, // prevent cross site scripting attack
        secure: true,
        sameSite: 'strict', //  prevent cross site request foregegy attack
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    console.log('token', token);
    return res.status(200).json({ message: 'Login successful', user: userExist });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export default loginController;
