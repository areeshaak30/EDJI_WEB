import React from "react";
import HeaderImage from "../assets/images/Headerimage.png";
import HomeA from "../assets/Svg/home.svg"

const Message = () => {
  return (
    <div className=" h-full flex flex-col">
        {/* Header section */}
      <div className="h-[200px] w-full ">
        <img
          src={HeaderImage}
          alt="Header Background"
          className="h-full w-full object-cover rounded-t-lg"
        />
      </div>
      {/* Main content */}
      <div className="flex flex-grow">
        {/* side bar */}
        <div className="w-1/5 mx-10">
        <ul className=" text-gray-400">

           <li className="flex items-center space-x-2 hover:text-white  hover:bg-blue-700 py-3 rounded">
              <span> <img src={HomeA} alt="" /></span>
              <span>Homepage</span>
            </li>
           <li className="flex items-center space-x-2 hover:text-white  hover:bg-blue-700 py-3 rounded">
              <span>📋</span>
              <span>Message</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-white  hover:bg-blue-700 py-3 rounded">
              <span>📋</span>
              <span>Tasks</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-white  hover:bg-blue-700 py-3 rounded">
              <span>📰</span>
              <span>News</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-white  hover:bg-blue-700 py-3 rounded">
              <span>📂</span>
              <span>Documents</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-white  hover:bg-blue-700 py-3 rounded">
              <span>📊</span>
              <span>My Project</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-white  hover:bg-blue-700 py-3 rounded">
              <span>🏠</span>
              <span>My Apartment</span>
            </li>
        </ul>
        
        </div>
               {/* Message Section  */}
        <div className="w-4/5">
        <div className="">
            <div className=" font-bold"> <h1>Message</h1></div>
            <div className="">   </div>
        </div>
        
        
        </div>

      </div>




    </div>
  );
};
export default Message;
