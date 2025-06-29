import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { ModalContext } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const modal = useContext(ModalContext);
  const quizeUser = localStorage?.getItem('quizeUser')?.split(' ')[0];
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('https://pariksha-application-2.onrender.com/api/verify', {withCredentials: true });
        const authenticate = res?.data?.authenticated;
        setAuth(authenticate);
        // console.log('res.data.authenticated:', authenticate);
      } catch (err) {
        // console.error('Auth check failed:', err);
        setAuth(false); // Explicitly mark as unauthenticated
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // console.log('auth updated:', auth);
    if (auth === false) {
      modal.setIsModal(true); // Show a modal saying "you must be logged in"
    }
  }, [auth]);

  if (auth === null) return <div>Loading...</div>; //If still checking auth (null): show Loading...
  if (auth === false) return <Navigate to="/" replace />; // replace -> Redirect, but don’t keep the current page in history
  return children
  
};

export default ProtectedRoute;
