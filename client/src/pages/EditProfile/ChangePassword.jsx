import { useState } from "react";
import EditProfileButton from "./ProfileComponents/EditProfileButton";
import classes from "./ChangePassword.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";

function ChangePassword() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = form;

  const [errors, setErrors] = useState({});

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const hostURL = import.meta.env.VITE_REACT_API_URL;

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      //reset errors
      setErrors({});

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
      const response = await fetch(`${hostURL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: form.password,
        }),
      });

      if (response.ok) {
        alert("Password changed!");
        setForm({
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log("Failed to update password", error);
    }
  };
  return (
    <MobileSubPage
      header="Change Password"
      fontSize="text-xl lg:text-3xl mr-4 lg:mr-0"
    >
      <div className="h-full font-poppins">
        {/* <div className=" h-16 lg:h-20 w-full bg-tahiti-100 flex lg:justify-evenly font-poppins">
        <Link to="/profile">
          <button>
            <IoIosArrowBack className="w-8 h-8 lg:w-8 lg:h-8 ml-2 lg:ml-8 mt-4 lg:mt-6" />
          </button>
        </Link>
        <h1 className="my-auto lg:text-3xl text-xl font-semibold tracking-wide mx-auto">
          Change Password
        </h1>
        <button className="font-bold mr-2 lg:mr-12">Done</button>
      </div> */}
        <div className="flex w-full h-full flex-col px-2 lg:px-8">
          {/* <h1 className="font-extrabold lg:text-4xl text-2xl">Change Password</h1> */}
          <form
            onSubmit={onSubmit}
            className="grid w-full lg:w-1/2 mt-4 lg:mt-8 mx-auto"
          >
            {/* <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              // value={form.password}
              placeholder="Current password"
              onChange={handleChange}
              className="block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
          </div> */}
            <div>
              <h2 className="text-xl font-semibold">
                In order to protect your account, make sure your password:
              </h2>
              <ul className="ml-8 mt-4">
                <li className="list-disc mt-2">
                  Password must be atleast 8 characters
                </li>
                <li className="list-disc mt-2">
                  Password should not include spaces
                </li>
                <li className="list-disc mt-2 mb-5">
                  Password should not be blank
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                placeholder="New password"
                onChange={handleChange}
                className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
              />
              {errors.password && (
                <label className="text-red-500 text-xs mt-1">
                  {errors.password}
                </label>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                placeholder="Re-type new password"
                onChange={handleChange}
                className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
              />
              {errors.confirmPassword && (
                <label className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </label>
              )}
            </div>

            {/* <EditProfileButton type={"submit"} buttonName={"Submit Changes"} /> */}
            <button
              type="submit"
              className="mb-4 lg:mt-8 w-full rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Update Password
            </button>
            {/* <button
            type="submit"
            className=" lg:ml-auto lg:mr-auto lg:mt-8 lg:w-3/12 w-full rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Cancel
          </button> */}
          </form>
        </div>
      </div>
    </MobileSubPage>
  );
}

export default ChangePassword;
