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

      if (response.ok) {
        alert('Profile Updated Successfully');

        setForm({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
        });
      }
    } catch (error) {
      console.log(error);
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
          <EditProfileButton buttonName={'Submit Changes'} type={submit} />
        </form>
      </section>
    </div>
  );
}

export default EditProfile;
