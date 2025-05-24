
import AuthUser from '../../Models/authModel.js';
import bcrypt from 'bcrypt';

const signUpController = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();

    const userExist = await AuthUser.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const userData = {
      name: req.body.name.toLowerCase(),
      email,
      password: hashPassword,
    };

    const user = await AuthUser.create(userData);
    return res.status(201).json({ message: 'User created successfully', user });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export default signUpController;
