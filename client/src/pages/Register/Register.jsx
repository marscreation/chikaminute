import { useState, useEffect } from "react";
import classes from "./Register.module.css";

function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstname, lastname, username, email, password, confirmPassword } =
    form;

  const [errors, setErrors] = useState({});

  //handle input change
  const handleInputChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  //handle registration submit
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      //reset error
      setErrors({});

      //FORM VALIDATION

      //firstName
      if (!firstname || firstname.trim() === "") {
        setErrors((previous) => ({
          ...previous,
          firstname: "Name is required",
        }));
        return;
      }

      //lastName
      if (!lastname || lastname.trim() === "") {
        setErrors((previous) => ({
          ...previous,
          lastname: "Name is required",
        }));
        return;
      }

      //email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email address",
        }));
        return;
      }

      //password validation
      //password must be more than or equal to 8
      //password must not have spaces
      if (password.length < 8 || password.includes(" ")) {
        setErrors((previous) => ({
          ...previous,
          password:
            "Password length must be at least 8 characters and should not include spaces",
        }));
        return;
      }

      //match passwords
      if (password !== confirmPassword) {
        setErrors((previous) => ({
          ...previous,
          confirmPassword: "Passwords do not match",
        }));
        return;
      }

      //fetch data
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        //clear form upon successful registration
        setForm({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        //temporary alert upon successful registration
        alert("Registration Successful");
      } else {
        //validate username if username already exist
        if (data.message === "User already exists") {
          setErrors((previous) => ({
            ...previous,
            username: "Username already used",
          }));
        }
        //validate email if email already used
        if (data.message === "Email already exists") {
          setErrors((previous) => ({
            ...previous,
            email: "Email already used",
          }));
        }
      }
      //
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen w-100 text-black pt-12 lg:pt-0 font-mono">
        <div className="h-auto w-5/6 lg:h-screen lg:w-screen border-2 border-slate-500 lg:border-0 bg-green-50 rounded-xl mx-auto">
          <section className={classes.registration}>
            <div className="logo">
              <h2>ChikaMinute</h2>
            </div>
          </section>

          <section className={classes.form}>
            <form onSubmit={onSubmit}>
              <div className={classes.formgroup}>
                <input
                  className={classes.formcontrol}
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={firstname}
                  placeholder="First Name"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {errors.firstname && (
                  <label className={classes.errorlabel}>
                    {errors.firstname}
                  </label>
                )}
                <input
                  className={classes.formcontrol}
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastname}
                  placeholder="Last Name"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {errors.lastname && (
                  <label className={classes.errorlabel}>
                    {errors.lastname}
                  </label>
                )}
                <input
                  className={classes.formcontrol}
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Username"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <label className={classes.errorlabel}>
                    {errors.username}
                  </label>
                )}
                <input
                  className={classes.formcontrol}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <label className={classes.errorlabel}>{errors.email}</label>
                )}
                <input
                  className={classes.formcontrol}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <label className={classes.errorlabel}>
                    {errors.password}
                  </label>
                )}
                <input
                  className={classes.formcontrol}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <label className={classes.errorlabel}>
                    {errors.confirmPassword}
                  </label>
                )}
              </div>
              <div className={classes.formgroup}>
                <button type="submit" className={classes.btn}>
                  Submit
                </button>
                <p>Already have an account? Login</p>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
