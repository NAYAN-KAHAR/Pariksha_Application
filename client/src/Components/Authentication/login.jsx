import  { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '../context/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { backedUrl } from '../Constant';

const FormPage = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLogin, setIsLogin] = useState(false);

    const modal =  useContext(ModalContext);
  

    const handleForm = async (e) => {
        e.preventDefault();
       
         try{
            let res;
            if(!name){
                res = await axios.post(`https://pariksha-application-2.onrender.com/api/login`, { email, password},{ withCredentials: true });
            }else{
                res = await axios.post(`https://pariksha-application-2.onrender.com/api/signup`, {name, email, password},{ withCredentials: true });
            }
            
            // console.log(res.data);
            if(res.data.message = "Login successful"){
                toast.success("Login successful")
                localStorage.setItem('quizeUser', res.data?.user?.name)
                setTimeout(() => modal.setIsModal(false),1000);
                return;
            }
            if(res.data.message = "User created successfully"){
                toast.success("User created successfully");
                setTimeout(() => setIsLogin(false), 1000);
                return;
            }

         }catch(err){
            console.log(err);
             toast.error(err.response.data.error);
         }
    
    }

    return (
        <>
   <ToastContainer />
  <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-10 z-20 flex items-center justify-center">

  <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl relative">
      <button onClick={() => modal.setIsModal(false)}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl font-bold cursor-pointer"
      >X</button>
      <h2 className="text-xl font-bold m-2 text-center">Get Started</h2>

      <form onSubmit={handleForm} className="flex flex-col gap-4">
          {isLogin && (
              <input type="text"
              name="fullName"
              placeholder="Full Name"
              className="p-2 border border-gray-300 rounded outline-none"
              onChange={(e) => setName(e.target.value)}
              required
          />
          )}
          <input type="email"                            
              placeholder="Email"
              className="p-2 border border-gray-300 rounded outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <input type="password" placeholder="Password"
              className="p-2 border border-gray-300 rounded outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit" className="bg-gray-700 text-white p-2 rounded cursor-pointer hover:bg-gray-600"
          > Submit</button>
          {isLogin ? <p className='text-center'>Already have an account ?
                    <Link onClick={() => setIsLogin(false)}><span className='text-gray-700 font-bold'> Login</span></Link></p>

                   : <p className='text-center'>Don't  have an account ? 
                   <Link  onClick={() => setIsLogin(true)}><span className='text-gray-700 font-bold'> Sign up</span></Link></p>
            }
      </form>
  </div>
</div>

    
      
               
        </>
    )
}



export default FormPage;