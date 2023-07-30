import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import blankAvatar from "../../assets/blankAvatar.png";
import classes from "./ContactModal.module.css";
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
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={handleModalClick}>
        <div className={classes.content}>
          <div className={classes.title}>
            <h2>Search user: </h2>
            <span className="close" onClick={onClose}>
              Close
            </span>
          </div>
          <div className="relative p-2 lg:p-6">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-9 flex items-center pointer-events-none">
              <AiOutlineSearch className="text-gray-600" />
            </div>
            <input
              className="w-full rounded-lg border border-gray-300 pl-8 lg:pl-10 pr-4 py-2 focus:outline-none focus:ring focus:border-tahiti-150 dark:focus:border-gray-500"
              type="text"
              value={search}
              placeholder="Search users"
              onChange={handleInputChange}
            />
            <button>Go</button>
          </div>
          <div>
            <h1>Result: </h1>
            <div>
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
