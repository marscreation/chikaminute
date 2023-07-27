import ChatBox from "../ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { ChatProvider } from "../../context/ChatContext";
import { UserProvider } from "../../context/UserData";

function Home() {
  return (
    <>
      <UserProvider>
        <Navbar />
      </UserProvider>
      <ChatProvider>
        <div className="chat sm:grid relative font-poppins">
          <section className="sidebar">
            <ChatList />
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
