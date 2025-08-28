import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import HomePage from '../Pages/HomePage'
import ServicesPage from '../Pages/ServicesPage';
import About from '../Pages/About';
import JoinUs from '../Pages/JoinUs';
import Ministries from '../Pages/Ministries';
import Contact from '../Pages/Contact';
import Giving from '../Pages/Giving';
import ResourcesPage from '../Pages/ResourcesPage';
import ChurchShop from '../Pages/ChurchShop';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' >
        <Route index element={<HomePage/>}/>
        <Route path='/services' element={<ServicesPage/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/join-us' element={<JoinUs/>} />
        <Route path='/ministries' element={<Ministries/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/give' element={<Giving/>} />
        <Route path='/resources' element={<ResourcesPage/>}/>
        <Route path='shop' element={<ChurchShop/>}/>
      </Route>
      
    )
  )

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
