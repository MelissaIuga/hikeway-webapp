import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import darkLogo from '../images/darklogo.svg';

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form

    signInWithEmailAndPassword(auth, mail, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user); // to test logging the authenticated user in
      })
      .catch(error => {
        let code = error.code; // saving error code in variable
        code = code.replaceAll("-", " "); 
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  // return signin form with a link leading to signup if user does not have an account
  return (
    <section id="sign-in-page" className="page">
       <img src={darkLogo} alt="Logo" className="logo" />
      <h1>Log In</h1>
      <form id="sign-in-form" onSubmit={handleSignIn}>
      <div className="inputgroup">
        <label htmlFor="mail">Email</label>
        <input
          id="mail"
          type="email"
          name="mail"
          aria-label="mail"
          placeholder="mymail@gmail.com"
          required
        />
        </div>
        <div className="inputgroup">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <p>Forgot password?</p>
        </div>
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
        <div className="formbtn">
          <button>Log in</button>
        </div>
      </form>
      <p className="text-center">
        Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </section>
  );
}
