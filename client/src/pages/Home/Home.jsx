import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillMessage } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import PinnedConversation from "./PinnedConversation";
import Conversation from "./Conversation";
import { CgProfile, CgDarkMode } from "react-icons/cg";
import { RiLogoutCircleFill } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import ChatBox from "../ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar/>
      <ChatList />
    </>
  );
}

export default Home;
