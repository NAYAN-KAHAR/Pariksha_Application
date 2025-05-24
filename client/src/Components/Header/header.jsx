
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import FormPage from '../Authentication/login';
import { ModalContext  } from '../context/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
    const[isRefresh, setIsRefresh] = useState(false);

    const modal = useContext(ModalContext);
    const quizeUser = localStorage?.getItem('quizeUser')?.split(' ')[0];

    const logoutHandle = async () => {
        try{
            const res = await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
            console.log(res.data);
            localStorage.removeItem('quizeUser');
            toast.success('logout user successfully');
            setIsRefresh(!isRefresh);
        }catch(err){
            console.log(err)
        }
    }


    return(
        <>
        <ToastContainer />
        
   <div className="flex justify-between items-center shadow fixed w-full h-14 bg-white z-20 px-4">
      <div className="centered flex items-center justify-between w-[80%] ">
  
            <Link to="/">
            <h2 className="font-bold cursor-pointer">
                <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq9mGX9W3pxxwM5WOzVGvBVZ_UrFagSFPbmQ&s" 
                alt="logo" 
                width={40}/></h2>
            </Link>
            {quizeUser ? (
                
                <div className='flex justify-between items-center gap-2'>
                     <button className="bg-gray-700 text-white text-sm font-bold rounded h-8 w-25 cursor-pointer hover:bg-gray-600">
                👨🏻‍💼 {quizeUser} </button>
                <img onClick ={logoutHandle} src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" width={33} alt="logo" className="cursor-pointer"  title="Logout" />
                  
                </div>
                             
                
            ): (
               <button  onClick={() => modal.setIsModal(true)} className="bg-gray-700 text-white text-sm font-bold rounded h-8 w-28 cursor-pointer hover:bg-gray-600"> Get Started </button>
            )
                
            }
  </div>
</div>

            

   {modal.isModal && ( <FormPage />  )}
            
        </>
    )
}

export default Header;