import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiFillMessage } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PinnedConversation from './PinnedConversation';
import Conversation from './Conversation';
import { CgProfile, CgDarkMode } from 'react-icons/cg';
import { RiLogoutCircleFill } from 'react-icons/ri';
import logo from '../../assets/logoBg.jpg';
import ChatBox from '../ChatBox/ChatBox';
import { Link } from 'react-router-dom';

function Home({ setIsLoggedIn }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  function handleLogout() {
    //remove token upon logout
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');

    //set login to false and redirect to login
    setIsLoggedIn(false);
  }

  return (
    <>
      <div className="h-auto w-screen text-black bg-tahiti-100 lg:bg-white rounded-xl font-poppins">
        <div className="h-20 w-full bg-white rounded-xl p-2 flex">
          <AiFillMessage className="h-8 w-8 lg:h-16 lg:w-16 mr-10 ml-2 text-tahiti-150 lg:ml-60 lg:mr-40" />
          <label className="font-bold text-3xl lg:mr-60 lg:mt-3">Message</label>
          <div
            className="h-8 w-6 ml-20 lg:ml-96 lg:mt-4 cursor-pointer"
            onClick={handleMenuToggle}
          >
            <BsThreeDotsVertical />
          </div>
        </div>
        <div>
          <div className="pl-2 lg:pl-10 lg:pr-0 lg:pt-5 ml-1 mt-2 lg:mt-0 w-full h-auto text-sm text-slate-500 lg:bg-tahiti-100 lg:w-2/5">
            <div className="flex -mt-16 ml-1 lg:-mt-12 w-full h-6">
              <input
                type="text"
                className="bg-tahiti-100 lg:bg-white h-6 mt-6 -ml-3 w-full rounded-xl pl-10 lg:pl-24 lg:w-11/12 lg:mt-12  text-black"
              />
              <FiSearch className="mt-7 -ml-72 lg:-ml-96 lg:mt-12 lg:h-5" />
            </div>

            {menuVisible && (
              <div className="h-full lg:w-3/12 lg:ml-96 mt-2 ml-2 p-5 bg-white rounded-md w-full absolute z-10">
                <h1 className="text-black font-bold text-xl text-left mb-3">
                  Settings
                </h1>
                <hr />
                <div className="hover:bg-tahiti-100 rounded-md flex pl-2 pt-2">
                  <CgProfile className="h-8 w-10 text-black mt-1" />
                  <Link to="/profile">
                    <button className="block w-full text-left py-2 px-2 text-black text-lg">
                      Profile
                    </button>
                  </Link>
                </div>

                <div className="hover:bg-tahiti-100 rounded-md flex pl-2 pt-2 ">
                  <CgDarkMode className="h-8 w-10 text-black mt-1" />
                  <button className="block w-full text-left py-2 px-2 text-black text-lg">
                    Theme
                  </button>
                </div>
                <div className="hover:bg-tahiti-100 rounded-md flex pl-2 pt-2 mb-20">
                  <RiLogoutCircleFill className="h-8 w-10 text-black mt-1" />
                  <Link to="/" onClick={handleLogout}>
                    <button className="block w-full text-left py-2 px-2 text-black text-lg">
                      Logout
                    </button>
                  </Link>
                </div>
                <hr />
                <img src={logo} alt="logo" className="mt-5 h-20 mx-auto" />
              </div>
            )}

            <PinnedConversation />
            <Conversation />
          </div>
          <ChatBox />
        </div>
      </div>
    </>
  );
}

export default Home;
