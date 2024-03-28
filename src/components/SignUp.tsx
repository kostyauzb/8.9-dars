import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = values;

    if (email == "") {
      alert("porivide email");
      return;
    }
    if (password !== values.passwordConfirm) {
      alert("password should match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <h3>sign up</h3>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder=" your email"
        />
        <br />
        <br />
        <label htmlFor="pass">pasword</label>
        <input
          name="password"
          id="pass"
          onChange={handleChange}
          type="password"
        />
        <br />
        <br />
        <label htmlFor="pass2">confirm pasword</label>
        <input
          name="passwordConfirm"
          id="pass2"
          onChange={handleChange}
          type="password"
        />
        <button>sign app</button>
      </form>
    </div>
  );
};

export default SignUp;
