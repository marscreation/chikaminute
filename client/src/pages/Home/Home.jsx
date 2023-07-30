import ChatBox from "../ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { ChatProvider } from "../../context/ChatContext";
import { UserProvider } from "../../context/UserData";
import AddChatMate from "./AddChatMate";
import AddContact from "../AddContact/AddContact";

function Home() {
  return (
    <>
      <UserProvider>
        <Navbar />
      </UserProvider>
      <ChatProvider>
        <div className="chat sm:grid relative font-poppins">
          <section className="sidebar">
            <div className="flex">
              <AddChatMate />
              <AddContact />
            </div>
            <ChatList />
            {/* <AddContact /> */}
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
