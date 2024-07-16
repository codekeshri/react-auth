import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const ctx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);

  const switchAuthModeHandler = (e) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const url = isLogin
    ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A"
    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB_xv6dB9fyCD97pI4UeFDSFuz-qig94A";

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("inside submitHandler");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setSendingRequest(true);

    if (isLogin) {
      console.log("isLogin");
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log("islogin response", res);

        return res
          .json()
          .then((data) => {
            localStorage.setItem("token", data.idToken);
            ctx.loggedIn = true;
            ctx.token = data.idToken;
            console.log(data.idToken, ctx.loggedIn, ctx.token);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json().then((data) => {
            console.log(data);
            alert("response signin");
          });
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setSendingRequest(false);
        });
    }
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit" className={classes.toggle}>
              {!isLogin ? "Create account" : "Login"}
            </button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Switch to sign up" : "Switch to Login"}
            </button>
            {sendingRequest && <p>Sending request...</p>}
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
