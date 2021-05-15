import React from 'react';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from 'firebaseConfig';
// import Post from './modules/post/post'



// type AppProps = {
//   user?: firebase.User | null;
//   signOut: () => void;
//   signInWithGoogle: () => void;
// }; 

function App(props:WrappedComponentProps) {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;
  
  return (
    <div className="App">
       <div className="App">
    <header className="App-header">
      {
        user 
          ? <p>Hello, {user.displayName}</p>
          : <p>Please sign in.</p>
      }
      {
        user
          ? <button onClick={signOut}>Sign out</button>
          : <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </header>
  </div>
    </div>
  );
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
providers.googleProvider.setCustomParameters({
  hd: 'gmail.com',
});
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
