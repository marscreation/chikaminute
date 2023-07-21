import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) errors.username = 'username is required';
    if (!password.trim()) errors.password = 'Password is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const errors = {};

      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();

      if (response.status == 400) {
        alert(result.message);
        return;
      }
      if (result.token) {
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('userId', result.user.id);
        console.log(result);
        setIsLoggedIn(true);
        navigate('/profile');
        alert('welcome');
      }
      if (result.error) {
        errors.login = result.error;
        setErrors(errors);
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    if (token && userId) {
      setIsLoggedIn(true);
      navigate('/profile');
    }
  }, []);

  return (
    <div className="login grid min-h-screen">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-28 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-4 text-center text-5xl font-bold leading-9 tracking-tight text-tahiti-150 mb-4">
            ChikaMinute
          </h2>
          <p className="text-center">
            Log in to see photos, videos and blogs from your friends
          </p>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-gray-500">
            Don't have an account?
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {' '}
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
