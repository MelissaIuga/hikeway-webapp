import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import darkLogo from '../images/darklogo.svg';

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignUp(event) {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const mail = form.mail.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(auth, mail, password)
      .then(userCredential => {
        // Created and signed in
        const user = userCredential.user;
        createUser(user.uid, name, mail);
      })
      .catch(error => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  async function createUser(uid, name, mail) {
    const url = `https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name, mail })
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New user created: ", data);
    } else {
      setErrorMessage("Sorry, something went wrong");
    }
  }

  return (
    <section id="sign-up-page" className="page">
      <img src={darkLogo} alt="Logo" className="logo" />
      <h1>Sign Up</h1>
      <form id="sign-up-form" onSubmit={handleSignUp}>
      <div className="inputgroup">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="What's your name?"
        />
        </div>
        <div className="inputgroup">
        <label htmlFor="mail">Email</label>
        <input
          id="mail"
          type="email"
          name="mail"
          aria-label="mail"
          placeholder="mymail@gmail.com"
          required
          autoComplete="off"
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
        </div>
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
        <div className="formbtn">
          <button>Sign Up</button>
        </div>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/sign-in">Log In</Link>
      </p>
    </section>
  );
}
