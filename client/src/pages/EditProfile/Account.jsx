import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";

function Account() {
  const [deleteUser, setDeleteUser] = useState("");

  const hostURL = "http://127.0.0.1:3000";
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setDeleteUser(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (deleteUser === "DELETE") {
      try {
        const response = await fetch(`${hostURL}/user/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentUserId: `${userId}`,
          }),
        });

        const data = response.json();

        alert("User deleted successfully");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please type DELETE correctly");
    }
  };

  return (
    <MobileSubPage
      header="Account"
      rightBtn="Done"
      fontSize="text-2xl lg:text-3xl"
    >
      <div className="min-h-screen font-poppins">
        <div>
          <h2 className="text-xl font-semibold">
            Are you sure you want to delete your account?
          </h2>
          <ul className="ml-8 mt-4">
            <li className="list-disc mt-2">
              Please type "DELETE" to delete your account
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="delete"
              name="delete"
              value={deleteUser}
              autoComplete="off"
              onChange={handleChange}
              className="dark:bg-tahiti-200 dark:text-white block w-full lg:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
            />
            <button
              type="submit"
              className="mb-4 lg:mt-8 w-full lg:w-1/2 rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </MobileSubPage>
  );
}

export default Account;
