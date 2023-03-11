import { useState, useRef,useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { AuthContext } from "../../Context/Context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const authCTX = useContext(AuthContext)
  const history = useHistory()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setIsSubmiting(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    // optional : Add validation
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwLzo_QZuf51mgNaePMbkwCZ3dGTMGi9Y";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwLzo_QZuf51mgNaePMbkwCZ3dGTMGi9Y";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsSubmiting(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessgae = " Authentication faild";
            throw new Error(errorMessgae);
          });
        }
      })
      .then((data) => {
        authCTX.login(data.idToken)
      }).then(()=>{
        history.push('/profile')
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passRef} />
        </div>
        <div className={classes.actions}>
          {!isSubmiting && (
            <button
              type="submit"
              className={classes.action}
              onClick={submitHandler}
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
          )}
          {isSubmiting && <p className="text-white">Sending Request...</p>}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
