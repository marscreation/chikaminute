import { useState, useEffect } from "react";
import classes from "./Register.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Login from "../Login/Login";

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
      <div className="grid min-h-screen font-poppins">
        <div className="dark:bg-tahiti-300 dark:text-white flex min-h-full flex-col bg-tahiti-100 justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-28 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-4 text-center text-5xl font-bold leading-9 tracking-tight text-tahiti-150">
              ChikaMinute
            </h2>
          </div>

          <section className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="mb-10">
                <div className="flex lg:gap-x-2">
                  <div>
                    <div className="mt-2">
                      <input
                        className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6"
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
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6"
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
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <input
                      className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6"
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
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <input
                      className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      autoComplete="off"
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <label className={classes.errorlabel}>
                        {errors.email}
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <div className="mt-2">
                    <input
                      className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6"
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
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <input
                      className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6"
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
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="-mt-5 flex w-full justify-center rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Submit
                </button>
                {/* <div className="h-auto w-full mx-auto">
                <p className="text-sm">Already have an account?</p>
                <p className="text-tahiti-150 text-sm -mt-5 ml-52">Login</p>
              </div> */}
              </div>
            </form>
            <p className="mt-5 lg:text-center lg:text-lg">
              Already have an account?
              {/* <a
                href="#"
                className="ml-2 font-semibold leading-6 text-tahiti-150 hover:text-blue-500"
              >
                Login
              </a> */}
              <Link
                to="/"
                className="ml-2 font-semibold leading-6 text-tahiti-150 hover:text-blue-500"
              >
                Login
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
