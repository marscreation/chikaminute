import { useState } from 'react';
import EditProfileButton from './ProfileComponents/EditProfileButton';

function ChangePassword() {
  const [form, setForm] = useState({
    password: '',
  });

  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  const handleChange = (event) => {
    setForm({ password: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
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
        <EditProfileButton type={'submit'} buttonName={'Submit Changes'} />
      </form>
    </div>
  );
}

export default ChangePassword;
