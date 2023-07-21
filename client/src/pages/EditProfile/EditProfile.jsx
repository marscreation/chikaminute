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
    <div className={classes.editProfileContainer}>
      <section className={classes.editProfile}>
        <form onSubmit={handleSubmit}>
          <label>First Name: </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={form.firstname}
            placeholder="First name"
            autoComplete="off"
            onChange={handleChange}
          />
          <label>Last Name: </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={form.lastname}
            placeholder="Last name"
            autoComplete="off"
            onChange={handleChange}
          />
          <label>Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            placeholder="Username"
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.username && (
            <label className={classes.errorlabel}>{errors.username}</label>
          )}
          <label>Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            placeholder="Email"
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.email && (
            <label className={classes.errorlabel}>{errors.email}</label>
          )}
          <EditProfileButton buttonName={'Submit Changes'} type={'submit'} />
        </form>
      </section>
    </div>
  );
}

export default EditProfile;
