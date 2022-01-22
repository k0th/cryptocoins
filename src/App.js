// import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';

function App() {

  //This mock help us like a database. 
  const database = {
      name: '',
      lastname: '',
      email:'',
      phone: 401,
  }

  return (
    //BrowserRouter controlls the routes in the app
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome database={database}/>}/>
      <Route path="/dashboard" element={<Dashboard database={database}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
