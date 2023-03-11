import React, { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../../Context/Context";

const ProfileForm = () => {
  const passInputRef = useRef();
  const authCTX = useContext(AuthContext);

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    const newPass = passInputRef.current.value;
    console.log({ authCTX: authCTX });
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCwLzo_QZuf51mgNaePMbkwCZ3dGTMGi9Y",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCTX.token,
          password: newPass,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //assume always success
      return res.json()
    }).then(data=>{
      console.log(data)
    });
  };

  return (
    <form className={classes.form} onSubmit={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={passInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
