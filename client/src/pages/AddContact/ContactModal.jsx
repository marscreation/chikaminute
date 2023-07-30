import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import blankAvatar from "../../assets/blankAvatar.png";
import UserContact from "./UserContact";

function ContactModal({ onClose }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const currentUserId = sessionStorage.getItem("userId");
  const hostURL = "http://127.0.0.1:3000";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${hostURL}/user?search=${search}`);
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        console.log(error);
      }
    };

    //if search is not empty, run fetchResults, if not set result to empty array
    if (search !== "") {
      fetchResults();
    } else {
      setSearchResult([]);
    }
  }, [search]);

  const handleContactClick = async (userId) => {
    try {
      const response = await fetch(`${hostURL}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: userId,
        }),
      });

      if (response.ok) {
        alert(`Chat created`);
      } else if (response.status === 400) {
        const error = await response.json();
        alert(`Chat creation failed ${error.message}`);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  //stop closing the modal when content is clicked
  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-4/12 bg-white dark:bg-tahiti-300 dark:text-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 dark:hover:text-white font-bold focus:outline-none"
            >
              X
            </button>
          </div>
          <h2 className="text-lg font-bold mb-2">Search user: </h2>
          <div className="relative mt-2 mb-3">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-2 flex items-center pointer-events-none">
              <AiOutlineSearch className="text-gray-600 dark:text-white" />
            </div>
            <input
              className="w-full dark:bg-tahiti-200 rounded-lg border border-gray-300 pl-8 lg:pl-10 pr-2 py-2 focus:outline-none focus:ring focus:border-tahiti-150 dark:focus:border-gray-500"
              type="text"
              value={search}
              placeholder="Search..."
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h1 className="font-bold mb-4">Result: </h1>
            <div className="h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {searchResult.map((user) => (
                <UserContact
                  key={user._id}
                  img={user?.profilePicture || blankAvatar}
                  firstname={user.firstname}
                  lastname={user.lastname}
                  onChatCreate={() => handleContactClick(user._id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
