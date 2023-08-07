import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";
import blankAvatar from "../../assets/blankAvatar.png";

function EditProfile() {
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
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
      <MobileSubPage header="Profile" fontSize="text-2xl lg:text-3xl">
        <div className="grid h-full font-poppins">
          <div className="flex min-h-full flex-col px-6 lg:px-8">
            {userData ? (
              <>
                <section className="h-auto mt-3 lg:mt-5">
                 <div className="mx-auto mt-2 h-44 w-44 lg:h-52 lg:w-52 rounded-full border-8 border-tahiti-100">
                    <img
                      src={userData?.profilePicture || blankAvatar}
                      alt="userAvatar"
                      className="rounded-full h-40 w-40 lg:h-48 lg:w-48 "
                    />
                  </div>
                  <div className="text-center mb-2 lg:text-xl">
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
