/**
 *@param header String title of the page
 *@param footerContent String An to be placed on footer area
 **/
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function MobileSubPage(props) {
  return (
    <div className="absolute top-0 left-0 font-poppins inset-0 h-screen flex-col flex justify-center dark:text-white dark:bg-tahiti-300">
      <div className="h-16 lg:h-20 w-full dark:bg-tahiti-200 dark:text-white bg-tahiti-100">
        <div className="header relative">
          {/* <button className="back px-4 h-full absolute left-0">BACK</button> */}
          <Link to="/home">
            <button>
              <IoIosArrowBack className="w-8 h-8 lg:w-8 lg:h-8 ml-2 lg:ml-5 mt-4" />
            </button>
          </Link>
          <div className="grid place-content-center -mt-10 font-bold text-xl">
            <p className={props.fontSize}>{props.header}</p>
          </div>
          {props.rightBtn && (
            // need to update this
            // add prompt to discard changes or something...
            <Link to="/home">
              <button
                className="back lg:px-4 mr-3 mt-2 h-full absolute right-0 top-0 text-xl"
                onClick={props.rightBtnClick}
              >
                {props.rightBtn}
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="body overflow-y-auto h-screen py-2">{props.children}</div>
      {props.footerContent && <div className="h-16">{props.footerContent}</div>}
    </div>
  );
}

export default MobileSubPage;
