import React, { useState } from "react";
import mailSide from "../assets/images/mailside-image.png";
import BackArrow from "../assets/images/backarrow.png";
import Rside from "../assets/images/Rside.png";
import Lside from "../assets/images/Lside.png";
import WallStreet from "../assets/images/wallstreet.png"
import ProjectX from "../assets/images/projectx.png"
import AdjiLogo from "../assets/images/EdjiLogo.png";
import ReactFlagsSelect from "react-flags-select";

const ProjectSelection = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2">
        {/* Back Arrow */}
        <div className="mt-5 ml-[97px]">
          <a href="#">
            <img src={BackArrow} alt="Back Arrow" />
          </a>
        </div>

        {/* Images and Dropdown */}
        <div className="flex justify-between">
          <div>
            <img src={Rside} alt="Right Decorative" />
          </div>
          {/* Dropdown */}
          <div className="mt-10">
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
              className="hover:bg-blue-100 rounded"
            />
          </div>
          {/* Left Image */}
          <div className="relative ml-10">
            <img src={Lside} alt="Left Decorative" />
          </div>
        </div>

        {/* Verification Form */}
        <div className="text-center">
          <h1 className="text-3xl font-bold my-1">Project Selection</h1>
          <p className="text-gray-600 mb-6">
            Please select the project you would like to access{" "}
          </p>
        </div>

        <div className="flex justify-center gap-6 ">
          <div className=" w-[240px] h-[135px] border rounded-sm hover:border-blue-600">
            <img src={WallStreet} alt="" />
            
             </div>

          <div className=" w-[240px] h-[135px] border rounded-sm hover:border-blue-600">
            <img src={ProjectX} alt="" />
          </div>

        </div>

        <button
          type="submit"
          className="w-[514px] ml-[128px] bg-gradient-to-r my-8 from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg "
        >
          Go to project
        </button>

        {/* Footer */}
        <div className="flex justify-center ">
          <div>
            <img src={AdjiLogo} alt="Adji Logo" className="mx-auto pt-[5rem]" />
          </div>
        </div>
      </div>

      {/* Right Empty Section */}
      <div className="w-1/2 pt-4 pr-3">
        <div className="h-full w-full">
          <img
            src={mailSide}
            alt="Decorative"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSelection;
