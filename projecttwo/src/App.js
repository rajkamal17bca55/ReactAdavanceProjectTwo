import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './componentes/Signup';
import Login from './componentes/Login';
import Home from './componentes/Home';
import Profile from './componentes/Profile';
import Protect from './componentes/Protect';
import Busbooking from './ticketbooker/Busbooking';
import Navbar from './ticketbooker/Navbar';
import BookingDetails from './ticketbooker/BookingDetails';
import Classcomponenet from './ticketbooker/Classcomponenet';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      
      <Routes>
        <Route path='/' element={<Signup></Signup>} ></Route>
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/homepage' element={ <Protect Child={Home}/> } ></Route>
        <Route path='/profile' element={<Protect Child={Profile}/>} ></Route>
        <Route path='/busbook' element={<Protect Child={Busbooking}/>}></Route>
        <Route path='/bookingdetails/:id1' element={<Protect Child={BookingDetails}/>}></Route>

      </Routes>
      

      </div>
    </BrowserRouter>
    
  );
}

export default App;
