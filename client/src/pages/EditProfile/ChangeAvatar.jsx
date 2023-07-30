import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";
import blankAvatar from "../../assets/blankAvatar.png";
import { useState, useEffect } from "react";
import style from "../EditProfile/ChangeAvatar.module.css";

function ChangeAvatar() {
  const [userAvatar, setUserAvatar] = useState({ myAvatar: "" });
  const [userData, setUserData] = useState(null);
  const [avatarDropDownMenu, setAvatarDropDownMenu] = useState("hidden");

  //save and discard state functionality
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const hostURL = "http://127.0.0.1:3000";

  //update and save avatar to db (base64)
  const changeAvatar = async (newAvatar) => {
    try {
      await fetch(`${hostURL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profilePicture: newAvatar,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete avatar, also delete base64 from db
  const deleteAvatar = async () => {
    try {
      await fetch(`${hostURL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profilePicture: "",
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //fetch user data to render the current profile picture
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${hostURL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);

        setCurrentAvatar(data?.profilePicture || "");
        setIsChanged(false);
        // console.log(data);
      }
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //submit avatar function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await changeAvatar(userAvatar.myAvatar);
      setAvatarDropDownMenu("hidden");
      alert("Profile Picture successfully changed");
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  //discard functionality
  const handleDiscardChanges = () => {
    setUserAvatar({ myAvatar: currentAvatar });
    setIsChanged(false);
  };

  //avatar upload, setState to converted base64
  const handleAvatarUpload = async (event) => {
    const files = event.target.files;

    const avatar = files[0];

    //file validation
    const validateExtensions = ["jpeg", "jpg", "png", "svg"];
    const fileExtension = avatar.name.split(".").pop().toLowerCase();

    if (!validateExtensions.includes(fileExtension)) {
      alert("Invalid file type. Please use jpeg, jpg, png, and svg files.");
      return;
    }

    const base64 = await convertToBase64(avatar);
    // console.log(base64);
    setUserAvatar((prevAvatar) => ({ ...prevAvatar, myAvatar: base64 }));
    setIsChanged(true);
    event.target.value = null;
  };

  const handleAvatarDelete = () => {
    try {
      deleteAvatar();
      setUserAvatar({ myAvatar: "" });
      setAvatarDropDownMenu("hidden");
      alert("Avatar deleted successfully");
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  //convert the file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAvatarDropDown = () => {
    if (avatarDropDownMenu === "hidden") {
      setAvatarDropDownMenu("block");
    } else {
      setAvatarDropDownMenu("hidden");
    }
  };

  return (
    <MobileSubPage header="Edit Avatar" fontSize="text-2xl lg:text-3xl">
      <div className="grid h-full font-poppins">
        <div className="mb-3 p-2 pt-2 pb-0 mx-auto">
          <div className="flex min-h-full flex-col px-2 lg:px-8">
            <div>
              <h2 className="text-xl font-semibold -mt-2 lg:mt-2">Note:</h2>
              <ul className="ml-8 mt-2">
                <li className="list-disc text-sm lg:text-lg">
                  Kindly select the image to update your avatar
                </li>
                <li className="list-disc mt-2 text-sm lg:text-lg">
                  Only files with the extensions .jpg, .png, .jpeg, and .svg.
                  are accepted
                </li>
              </ul>
            </div>
            <label htmlFor="avatar-menu-button">
              <div className="mx-auto mt-2 lg:mt-4 h-44 w-44  lg:h-52 lg:w-52 rounded-full border-8 border-tahiti-100">
                <img
                  // render base64 file when the user updated the picture, it wont be saved unless submit button is clicked
                  // else render profilePicture from userData (database)
                  // else if there is no profile picture, render default photo (applies to everyone)
                  src={
                    userAvatar.myAvatar ||
                    userData?.profilePicture ||
                    blankAvatar
                  }
                  alt="userAvatar"
                  className="rounded-full h-40 w-40 lg:h-48 lg:w-48 "
                />
              </div>
            </label>
            <button
              id="avatar-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="avatar-dropdown"
              data-dropdown-placement="bottom"
              onClick={handleAvatarDropDown}
            ></button>
            {/* settings drop down menu */}
            <div
              className={avatarDropDownMenu}
              id="avatar-dropdown"
              style={{ inset: "62px 0px auto auto" }}
            >
              {/* list of avatar -> Delete Avatar, Upload Change */}
              <ul
                className="lg:mt-4 py-2 bg-gray-200 transition-transform mt-1 dark:bg-tahiti-200"
                aria-labelledby="avatar-menu-button"
              >
                {/* Upload Avatar */}
                <div className="text-center ">
                  <label
                    htmlFor="avatarUpload"
                    className="border-b border-white block px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Upload Avatar
                  </label>
                </div>
                {/* Change Password Link */}
                <div>
                  <button
                    htmlFor="avatarDelete"
                    className="block mx-auto py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={handleAvatarDelete}
                  >
                    Delete Avatar
                  </button>
                </div>
              </ul>
              {/*  */}
            </div>
            <form onSubmit={handleSubmit} className="w-fullmt-4 lg:mt-8">
              {/* input is hidden, picture is clickable */}
              <input
                type="file"
                label="userAvatar"
                name="userAvatar"
                id="avatarUpload"
                accept=".jpg, .png .jpeg, .svg"
                onChange={(event) => handleAvatarUpload(event)}
              />
              <div className="flex justify-between mt-5 h-12">
                <div className="w-1/2 h-full pr-2">
                  <button
                    type="submit"
                    className={`${
                      isChanged
                        ? "bg-tahiti-150 leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        : "bg-tahiti-150"
                    } text-white rounded-md text-lg h-full w-full`}
                  >
                    Save
                  </button>
                </div>
                <div className="w-1/2 h-full pl-2">
                  <button
                    type="button"
                    className="w-full h-full text-sm bg-tahiti-150 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 text-white font-semibold rounded-md"
                    onClick={handleDiscardChanges}
                    disabled={!isChanged}
                  >
                    Discard Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MobileSubPage>
  );
}

export default ChangeAvatar;
