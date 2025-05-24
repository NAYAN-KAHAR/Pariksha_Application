import jwt from 'jsonwebtoken';

const verifyUser = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.MY_SECRET);
    // console.log('decoded', decoded);
    return res.status(200).json({ authenticated: true, user: decoded });
  
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
};

export default verifyUser;
