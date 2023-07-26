import ChatBox from "../ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { ChatProvider } from "../../context/ChatContext";

function Home() {
  return (
    <>
      <ChatProvider>
        <Navbar />
        <div className="chat sm:grid relative">
          <section className="sidebar dark:bg-slate-700">
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
