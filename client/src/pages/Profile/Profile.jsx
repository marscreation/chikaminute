import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";
import blankAvatar from "../../assets/blankAvatar.png";
// import classes from "./Profile.module.css";
// import person from "../../assets/person.png";
// import EditProfileButton from "../EditProfile/ProfileComponents/EditProfileButton";
// import { BiEdit } from "react-icons/bi";
// import { PiKeyBold } from "react-icons/pi";
// import { IoIosArrowBack } from "react-icons/io";

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

        // console.log(data);
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
      {/* <div className=" h-16 lg:h-20 w-full bg-tahiti-100 flex font-poppins">
        <Link to="/home">
          <button>
            <IoIosArrowBack className="w-8 h-8 lg:w-8 lg:h-8 ml-2 lg:ml-5 mt-4 lg:mt-6" />
          </button>
        </Link>
        <h1 className="my-auto text-3xl font-semibold tracking-wide mx-auto">
          Profile
        </h1>
      </div> */}
      {/* <Navbar /> */}
      <MobileSubPage header="Profile" fontSize="text-2xl lg:text-3xl">
        <div className="grid h-full font-poppins">
          <div className="flex min-h-full flex-col px-6 lg:px-8">
            {userData ? (
              <>
                <section className="h-auto mt-3 lg:mt-5">
                  {/* <div className="float-right lg:mr-20 lg:mb-5">
                    <Link to="/editprofile">
                      <button>
                        <BiEdit className="w-8 h-8 lg:w-8 lg:h-8" />
                      </button>
                    </Link>
                  </div> */}
                  <div className="mx-auto mt-2 h-44 w-44 lg:h-52 lg:w-52 rounded-full border-8 border-tahiti-100">
                    <img
                      src={userData?.profilePicture || blankAvatar}
                      alt="userAvatar"
                      className="rounded-full h-40 w-40 lg:h-48 lg:w-48 "
                    />
                  </div>
                  <div className="text-center mb-2 lg:text-xl">
                    {/* <EditProfileButton buttonName="Edit Avatar" /> */}
                    <Link to="/changeavatar">
                      <button
                        className="font-semibold underline mt-2
                      "
                      >
                        Edit Avatar
                      </button>
                    </Link>
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
                {/* <div>
                  <div className="lg:mr-20 flex float-right">
                    <PiKeyBold className="mr-2 mt-1" />
                    <Link to="/changepassword">
                      <button className="underline text-xs font-bold">
                        CHANGE PASSWORD
                      </button>
                    </Link>
                  </div>
                </div> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </MobileSubPage>
    </>
  );
}

export default EditProfile;
