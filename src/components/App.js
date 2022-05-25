import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');
  const history = useHistory();

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password)
        .then((data) => {
          console.log(data)
          if (data.token) {
            localStorage.setItem('jwt', data.token);
            tokenCheck();
          }
        })
  }

  const handleRegister = ({email, password }) => {
    return auth.register(email, password)
    .then(() => {
      history.push('/signin');
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData(res.data.email);
        })
        .then(() => {
          history.push('/');
        });
      };
    }

  const signOut = () => {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
      setUserData(null);
      history.push('/signup');
    }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
      if (loggedIn) {
          history.push("/my-profile");
      }
  }, [loggedIn]);

  return (
      <Switch>
        <ProtectedRoute path="/my-profile" loggedIn={loggedIn}>
            <MyProfile userData={userData} loggedIn={loggedIn}/>
        </ProtectedRoute>
        <Route path="/signin">
          <div className="registerContainer">
            <Login handleLogin={handleLogin} tokenCheck={tokenCheck} loggedIn={loggedIn}/>
          </div>
        </Route>
        <Route path="/signup">
          <div className="registerContainer">
            <Register handleRegister={handleRegister} />
          </div>
        </Route>
        <Route >
          {loggedIn ? <Redirect to="/my-profile" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
  );
}

export default App;