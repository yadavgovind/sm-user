
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './component/signIn';
import SignUp from './component/signUp';
import './App.css';
import storeRoutes from './component/routes';

import history from './store/history'


const publicRoutes = () => {
  return (<Routes>
    <Route exact path='/' element={< SignIn />}></Route>
    <Route exact path='/sign-up' element={< SignUp />}></Route>
  </Routes>)
}

function App() {
  let a = [
    '/customer',
    '/dashboard',
    '/room',
    '/in-inventory',
    '/out-inventory',
    '/loan-detail',
    '/settlement'
  ];
  let hasRoute = a.some(
    data =>
      history.location.pathname === data ||
      history.location.pathname.includes('/customer') ||
      history.location.pathname.includes('/dashboard') ||
      history.location.pathname.includes('/room') ||
      history.location.pathname.includes('/in-inventory') ||
      history.location.pathname.includes('/out-inventory') ||
      history.location.pathname.includes('/loan-detail') ||
      history.location.pathname.includes('/settlement')
  );
  return (
    <Router>
      {!hasRoute ? publicRoutes()
        : storeRoutes()}
    </Router>
  );
}

export default App;
