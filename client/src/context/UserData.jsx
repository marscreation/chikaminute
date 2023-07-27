import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const [userData, setUserData] = useState(null);

  const hostURL = "http://127.0.0.1:3000";

  const fetchUserData = async () => {
    try {
      if (token && userId) {
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
