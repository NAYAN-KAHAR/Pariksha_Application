
const logoutController = (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
  
      return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Logout failed' });
    }
  };
  
  export default logoutController;
  