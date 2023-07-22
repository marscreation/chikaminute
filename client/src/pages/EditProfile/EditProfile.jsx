import { useState } from 'react';
import classes from './EditProfile.module.css';
import EditProfileButton from './ProfileComponents/EditProfileButton';

function EditProfile() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //reset
      setErrors({});

      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          username: form.username,
          email: form.email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile Updated Successfully');

        setForm({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
        });
      } else {
        //validate username if username already exist
        if (data.message === 'User already exists') {
          setErrors((previous) => ({
            ...previous,
            username: 'Username already used',
          }));
        }
        //validate email if email already used
        if (data.message === 'Email already exists') {
          setErrors((previous) => ({
            ...previous,
            email: 'Email already used',
          }));
        }
      }
    } catch (error) {
      console.log('Failed to update', error);
    }
  };
  return (
    <div className="grid min-h-screen font-poppins">
      <div className="lg:pl-40 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="font-extrabold lg:text-4xl text-2xl">
          Profile Information
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid w-full mt-4 lg:mt-8 lg:pl-40"
          // className=""
        >
          <div className="mb-4 lg:flex">
            <label className="lg:w-3/12 text-center lg:py-2">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={form.firstname}
              placeholder="First name"
              autoComplete="off"
              onChange={handleChange}
              // className="border-2 p-2 mt-2 border-tahiti-100 rounded-xl w-full"
              className="block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
          </div>
          <div className="mb-4 lg:flex">
            <label className="lg:w-3/12 text-center lg:py-2">Last Name: </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={form.lastname}
              placeholder="Last name"
              autoComplete="off"
              onChange={handleChange}
              className="block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
          </div>
          <div className="mb-4 lg:flex">
            <label className="lg:w-3/12 text-center lg:py-2">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              placeholder="Username"
              autoComplete="off"
              onChange={handleChange}
              className="block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
          </div>
          <div className="mb-4 lg:flex">
            <label className="lg:pr-10 lg:w-3/12 text-center lg:py-2">
              Email:{' '}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              placeholder="Email"
              autoComplete="off"
              onChange={handleChange}
              className="block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
          </div>
          {/* <EditProfileButton buttonName={"Submit Changes"} type={"submit"} /> */}

          <button
            type="submit"
            className="lg:ml-auto lg:mr-auto lg:mt-8 lg:w-1/2 w-full rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Update
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
