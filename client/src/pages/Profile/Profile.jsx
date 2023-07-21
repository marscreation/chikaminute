import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Profile.module.css';
import person from '../../assets/person.png';
import EditProfileButton from '../EditProfile/ProfileComponents/EditProfileButton';

function EditProfile() {
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);

        console.log(data);
      }
    } catch (error) {
      console.log('Error fetching data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className={classes.profileContainer}>
        {userData ? (
          <>
            <section className={classes.yourProfile}>
              <h1>Your Profile</h1>
              <div className={classes.avatar}>
                <img src={person} alt="userAvatar" />
              </div>
              <EditProfileButton buttonName="Edit Avatar" />
            </section>

            <section className={classes.yourProfileDetails}>
              <div className={classes.yourName}>
                <h3>Name</h3>
                <h3>
                  {userData.firstname} {userData.lastname}
                </h3>
              </div>
              <div className={classes.yourUsername}>
                <h3>Username</h3>
                <h3>{userData.username}</h3>
              </div>
              <div className={classes.yourEmail}>
                <h3>Email</h3>
                <h3>{userData.email}</h3>
              </div>
              <Link to="/editprofile">
                <EditProfileButton buttonName="Edit Profile" />
              </Link>
              <Link to="/changepassword">
                <EditProfileButton buttonName="Change Password" />
              </Link>
            </section>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default EditProfile;
