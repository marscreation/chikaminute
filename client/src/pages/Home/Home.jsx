import { useState } from "react";
import ChatBox from "../ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { ChatProvider } from "../../context/ChatContext";
import { UserProvider } from "../../context/UserData";
import SearchChatMate from "./SearchChatMate";

function Home() {
  const [findChat, setFindChat] = useState("");

  return (
    <>
      <UserProvider>
        <Navbar />
      </UserProvider>
      <ChatProvider>
        <div className="chat sm:grid relative font-poppins">
          <section className="sidebar">
            <SearchChatMate findChat={findChat} setFindChat={setFindChat} />
            <ChatList findChat={findChat} />
          </section>
          <section className="chatbox flex flex-col">
            <ChatBox />
          </section>
        </div>
      </ChatProvider>
    </>
  );
}

export default Home;
