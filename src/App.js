
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './component/signIn';
import SignUp from './component/signUp';
import ForgetPassword from './component/forgetPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< SignIn />}></Route>
        <Route exact path='/sign-up' element={< SignUp />}></Route>
        <Route exact path='/forget-password' element={< ForgetPassword />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
