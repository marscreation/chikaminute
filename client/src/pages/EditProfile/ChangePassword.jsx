import { useState } from 'react';
import EditProfileButton from './ProfileComponents/EditProfileButton';
import classes from './ChangePassword.module.css';

function ChangePassword() {
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const { password, confirmPassword } = form;

  const [errors, setErrors] = useState({});

  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

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

      if (password.length < 8 || password.includes(' ')) {
        setErrors((previous) => ({
          ...previous,
          password:
            'Password length must be at least 8 characters and should not include spaces',
        }));
        return;
      }

      //match passwords
      if (password !== confirmPassword) {
        setErrors((previous) => ({
          ...previous,
          confirmPassword: 'Passwords do not match',
        }));
        return;
      }

      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: form.password,
        }),
      });

      if (response.ok) {
        alert('Password changed!');
        setForm({
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.log('Failed to update password', error);
    }
  };
  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={onSubmit}>
        <label>Your new password </label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          placeholder="Enter new password"
          onChange={handleChange}
        />
        {errors.password && (
          <label className={classes.errorlabel}>{errors.password}</label>
        )}
        <label>Confirm new password </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
          placeholder="Confirm new password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <label className={classes.errorlabel}>{errors.confirmPassword}</label>
        )}
        <EditProfileButton type={'submit'} buttonName={'Submit Changes'} />
      </form>
    </div>
  );
}

export default ChangePassword;
