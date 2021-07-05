import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebaseConfig from "../../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app()
}

function Login() {

  if (firebase.apps.length === 0) {
    firebase.initializeApp({});
  }

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };



  const handleSignIn = () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser)

      })
      .catch(err => {
        console.error(err);

      });

  };

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        setUser(signOutUser)
      })
      .catch(err => {

      });
  }


  const handleBlur = (event) => {
    let isFromValid = true;

    if (event.target.name === 'email') {
      isFromValid = /\S+@\S+\.\S+/.test(event.target.value);

    }

    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFromValid = isPasswordValid && passwordHasNumber;
    }

    if (isFromValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }

  }


  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);

          updateUserName(user.name)

        })
        .catch(error => {

          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);

        })
        .catch(error => {

          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault()
  }


  const updateUserName = name => {

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(() => {

    }).catch((error) => {

    });

  }

  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignIn ? <button onClick={handleSignOut}>sign out</button> :
        <button onClick={handleSignIn}>sign in</button>

      }
      {
        user.isSignIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Your Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own Authentication</h1>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New user sign up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type='text' name='name' onBlur={handleBlur} placeholder='Enter Your name' required />}
        <br />
        <input type='text' name='email' onBlur={handleBlur} placeholder='Enter Your Email' required />
        <br />
        <input type='password' name='password' onBlur={handleBlur} placeholder='Enter Your password' required />
        <br />
        <input type='submit' value={newUser ? 'sign up' : 'sign in'} />
      </form>

      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Login'} successfully</p>
      }

    </div>
  );
}

export default Login;
