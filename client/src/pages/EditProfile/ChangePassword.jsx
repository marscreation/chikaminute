import { useState } from "react";
import EditProfileButton from "./ProfileComponents/EditProfileButton";

function ChangePassword() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = form;

  const [errors, setErrors] = useState({});

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

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

      const response = await fetch(`http://localhost:3000/user/${userId}`, {
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
    <div className="grid min-h-screen font-poppins">
      <div className="lg:pl-32 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="font-extrabold lg:text-4xl text-2xl">Change Password</h1>
        <form
          onSubmit={onSubmit}
          className="lg:ml-40 grid w-full mt-4 lg:mt-8 lg:pl-40"
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
                {" "}
                Password should not include spaces
              </li>
              <li className="list-disc mt-2 mb-5">
                {" "}
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
              className="block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
            {errors.password && (
              <label className="text-red text-xs mt-1">{errors.password}</label>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={form.confirmPassword}
              placeholder="Re-type new password"
              onChange={handleChange}
              className="block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
            {errors.confirmPassword && (
              <label className="text-red text-xs mt-1">
                {errors.confirmPassword}
              </label>
            )}
          </div>

          {/* <EditProfileButton type={"submit"} buttonName={"Submit Changes"} /> */}
          <button
            type="submit"
            className="mb-4 lg:mt-8 w-full lg:w-1/2 rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
  );
}

export default ChangePassword;
