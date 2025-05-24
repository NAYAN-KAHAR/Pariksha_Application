

import HomePage from './Components/HomePage/home';
import TestPage from './Components/TestPage/test';
import DashBoard from './Components/DashBoard/dashboad';
import Header from './Components/Header/header';
import { Routes, Route, useLocation, matchRoutes } from 'react-router-dom';
import { useState,Suspense } from 'react';
import { ModalContext  } from './Components/context/userContext';
import ProtectedRoute from './Components/Authentication/protectedRoute';
import ErrorPage from './Components/Error';


// valid routes
const routeConfig = [
  { path: '/' },
  { path: '/test/:id' },
  { path: '/dashboard' }
];


function App() {
  const [isModal, setIsModal] = useState(false); 
  const location = useLocation();
  // Check if current location matches any known route
  const matches = matchRoutes(routeConfig, location);
  const isKnownRoute = matches !== null;

  return (
    <>
    <ModalContext.Provider value= {{isModal, setIsModal}} >
        {isKnownRoute && <Header />}
      
    <Routes>
  
      <Route path='/' element={ <HomePage />} ></Route>
      <Route path='/test/:id' element={ <ProtectedRoute> <TestPage /> </ProtectedRoute>} ></Route>
      <Route path='/dashboard' element={<ProtectedRoute> <DashBoard /> </ProtectedRoute> } ></Route>
      <Route path='*' element={ <ErrorPage />} ></Route>
    </Routes>

   </ModalContext.Provider>
    </>
  );
}

export default App;

// https://opentdb.com/api_config.php
// Prevent parent components/elements from reacting to the same event.
// e.stopPropagation() prevents the event from bubbling up (or propagating) to parent elements in the DOM.

/*
 const shuffle = (array) => {
      for(let i = array.length-1; i>=0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]] = [array[j],array[i]] //  swap

      }
      return array;
  }
  console.log('shuffle array', shuffle([1, 2, 3, 4,11,22,33]));
*/