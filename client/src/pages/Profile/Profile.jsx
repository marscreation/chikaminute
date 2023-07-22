import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Profile.module.css";
import person from "../../assets/person.png";
import EditProfileButton from "../EditProfile/ProfileComponents/EditProfileButton";
import { BiEdit } from "react-icons/bi";
import { PiKeyBold } from "react-icons/pi";

function EditProfile() {
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);

        console.log(data);
      }
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="grid min-h-screen font-poppins">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          {userData ? (
            <>
              <section className="h-auto">
                <div className="float-right lg:mr-20 lg:mb-5">
                  <Link to="/editprofile">
                    {/* <EditProfileButton
                      className="mb-10"
                      buttonName="Edit Profile"
                    /> */}
                    <button>
                      <BiEdit className="w-8 h-8 lg:w-8 lg:h-8" />
                    </button>
                  </Link>
                </div>
                <div className="mb-3 p-5 pb-0 lg:h-60 lg:w-60 mx-auto">
                  <img src={person} alt="userAvatar" className="rounded-full" />
                </div>
                <div className="text-center mb-2 lg:text-xl">
                  {/* <EditProfileButton buttonName="Edit Avatar" /> */}
                  <button>Edit Avatar</button>
                </div>
              </section>
              <hr />

              <section className="pl-2 pt-5 rounded-xl lg:pl-36 w-full flex flex-col items-center lg:text-xl gap-3">
                <div className="w-full flex pb-2 h-auto">
                  <h3 className="mr-5 lg:mr-32  w-24 font-semibold">Name:</h3>
                  <h3>
                    {userData.firstname} {userData.lastname}
                  </h3>
                </div>
                <div className="w-full flex pb-2 h-auto">
                  <h3 className="mr-5 lg:mr-32 w-24 font-semibold">
                    Username:
                  </h3>
                  <h3>{userData.username}</h3>
                </div>
                <div className="w-full flex pb-2 h-auto mb-5">
                  <h3 className="mr-5 lg:mr-32 w-24 font-semibold">Email:</h3>
                  <h3>{userData.email}</h3>
                </div>
              </section>
              <hr />
              <div>
                <div className="lg:mr-20 flex float-right">
                  <PiKeyBold className="mr-2 mt-1" />
                  <Link to="/changepassword">
                    {/* <EditProfileButton buttonName="Change Password" /> */}

                    <button className="underline text-xs font-bold">
                      CHANGE PASSWORD
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default EditProfile;
