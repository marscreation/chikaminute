import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";
import blankAvatar from "../../assets/blankAvatar.png";
import { useState } from "react";

function ChangeAvatar() {
  const [userAvatar, setUserAvatar] = useState({ myAvatar: "" });

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

  //submit function
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      changeAvatar(userAvatar.myAvatar);
      alert("Profile Picture successfully changed");
    } catch (error) {
      console.log(error);
    }
  };

  //avatar upload, setState to converted base64
  const handleAvatarUpload = async (event) => {
    const avatar = event.target.files[0];
    const base64 = await convertToBase64(avatar);
    console.log(base64);
    setUserAvatar((prevAvatar) => ({ ...prevAvatar, myAvatar: base64 }));
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

  return (
    <MobileSubPage
      header="Edit Avatar"
      rightBtn="Done"
      fontSize="text-2xl lg:text-3xl"
    >
      <div className="min-h-screen font-poppins">
        <div className="mb-3 p-5 pb-0 lg:h-60 lg:w-60 mx-auto">
          <img
            src={userAvatar.myAvatar || blankAvatar}
            alt="userAvatar"
            className="rounded-full"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid w-full mt-4 lg:mt-8 lg:pl-40"
        >
          <input
            type="file"
            label="userAvatar"
            name="userAvatar"
            id="avatarUpload"
            accept=".jpg, .png .jpeg, .svg"
            onChange={(event) => handleAvatarUpload(event)}
          />
          <button type="submit">Submit changes</button>
        </form>
      </div>
    </MobileSubPage>
  );
}

export default ChangeAvatar;
