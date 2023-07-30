import Navbar from "../../components/Navbar/Navbar";
import { UserProvider } from "../../context/UserData";
import { ChatProvider } from "../../context/ChatContext";
import { Outlet } from "react-router-dom";
import Channels from "../../components/Channels/Channels";
import "./Chat.css";
import SearchChatMate from "../Home/SearchChatMate";
import AddContact from "../AddContact/AddContact";

function Chat() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <ChatProvider>
          <div className="chat sm:grid relative font-poppins">
            <section className="sidebar">
              <div className="flex">
                <SearchChatMate />
                <AddContact />
              </div>
              <Channels />
            </section>
            <section className="chatbox flex flex-col">
              <Outlet />
            </section>
          </div>
        </ChatProvider>
      </UserProvider>
    </>
  );
}

export default Chat;
