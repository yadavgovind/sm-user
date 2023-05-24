
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './component/signIn';
import SignUp from './component/signUp';
import './App.css';
import StoreRoutes from './component/routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< SignIn />}></Route>
        <Route exact path='/sign-up' element={< SignUp />}></Route>
        <Route exact path='/store' element={< StoreRoutes />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
