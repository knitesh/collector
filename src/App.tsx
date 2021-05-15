import React from "react";
import withFirebaseAuth, {
  WrappedComponentProps,
} from "react-with-firebase-auth";
import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "firebaseConfig";
import Posts from "./modules/post/posts";

const firebaseApp = app.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new app.auth.GoogleAuthProvider(),
};
providers.googleProvider.setCustomParameters({
  hd: "gmail.com",
});

// type AppProps = {
//   user?: firebase.User | null;
//   signOut: () => void;
//   signInWithGoogle: () => void;
// };

function App(props: WrappedComponentProps) {
  const { user, signOut, signInWithGoogle } = props;

  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
          {user ? (
            <button onClick={signOut}>Sign out</button>
          ) : (
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          )}
          {user ? (
            <>
              <Posts app={app} /> Hello
            </>
          ) : null}
        </header>
      </div>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
