import React, { useState, useEffect } from "react";
import mailSide from "../assets/images/mailside-image.png";
import BackArrow from "../assets/images/backarrow.png";
import Rside from "../assets/images/Rside.png";
import Lside from "../assets/images/Lside.png";
// import wrongAlert from "../assets/images/alert.png"
import AdjiLogo from "../assets/images/EdjiLogo.png";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router-dom";

const EmailVarification = () => {
 const [selected, setSelected] = useState("");
 const [code, setCode] = useState(["", "", "", "", "", ""]);
 const [errorMessage, setErrorMessage] = useState("");
 const [timer, setTimer] = useState(30);
 const [mfaToken, setMfaToken] = useState("");
 const [oobCode, setOobCode] = useState("");
 const [otpCode, setOtpCode] = useState("")
 const navigate = useNavigate()

 useEffect(() => {
  console.log("MFA Token:", mfaToken);
  async function fetchTokens() {
    console.log("Fetching tokens...");
    try {
      const mfaTokenStorage = localStorage.getItem("mfaToken");
      const oobCodeStorage = localStorage.getItem("oobCode");
      setMfaToken(mfaTokenStorage);
      setOobCode(oobCodeStorage);
    } catch (e) {
      console.log(e);
      router.replace("/login");
    }
    console.log("MFA Token:", mfaToken);
    console.log("OOB Code:", oobCode);
  }
  fetchTokens();
}, [mfaToken, oobCode]);

useEffect(() => {
  const countdown = setInterval(() => {
    setTimer((prev) => (prev > 0 ? prev - 1 : 0));
  }, 1000);
  return () => clearInterval(countdown);
}, []);

// timer
// const handleCodeChange = (index, value) => {
//   if (isNaN(value)) return; // Only allow numeric input
//   const newCode = [...code];
//   newCode[index] = value;
//   setCode(newCode);
//   if (value && index < 5) {
//     inputRefs.current[index + 1].focus();
//   }
// };

const validateCode = async () => {
  // const fullCode = code.join("");
  // console.log("Full code:", fullCode);
  try {
    const res = await fetch("https://dev.edji.co/v1/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mfaToken}`,
      },
      body: JSON.stringify({
        grantType: "mfa_oob",
        mfaToken,
        oobCode,
        bindingCode: otpCode,
      }),
    });
    const data = await res.json();
    console.log(data,'dataa is here ')
    if (!data.accessToken) {
      setErrorMessage("Invalid code. Please try again.");
      setCode(["", "", "", "", "", ""]);
      return;
    }
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("expiresIn", data.expiresIn);
    // router.replace("/home");
    navigate('/home')
    console.log(data, "data");
  } catch (e) {
    console.log(e,"eeee");
  }
};

return (
  <div className="h-screen flex overflow-hidden">
    <div className="w-1/2">
      <div className=" mt-5 ml-[97px]">
        <a href="#">
          <img src={BackArrow} alt="" />
        </a>
      </div>

      <div className=" flex  justify-between">
        <div className="">
          <img src={Rside} alt="" />
        </div>
        {/* Dropdown  */}
        <div className="mt-10">
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => setSelected(code)}
            className="hover:bg-blue-100 rounded ml-20"
          />
        </div>
        {/* Dropdown End */}

        <div className="relative ml-10">
          <img src={Lside} alt="" />
        </div>
      </div>
      {/* Varification form  */}
      <div className="text-center">
        <h1 className="text-3xl font-bold my-1">Verify it’s you</h1>
        <p className="text-gray-600 mb-6">
          We have sent a verification code to the email{" "}
          <div className="font-medium text-black">zacholiver@gmail.com</div>
        </p>
      </div>
      <div className="ml-[99px]">
        <input
          type="text"
          name="emailCode"
          placeholder="input your code...."
          value={otpCode}
          onChange={(e)=>setOtpCode(e.target.value)}
          className="w-[514px] border border-blue-400 px-4 py-2 mt-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-sm text-gray-400 cursor-pointer my-3">
          Didn’t get the code?{" "}
          <span className="font-medium text-black underline">Resend</span>
        </p>
        {/* <img src={wrongAlert} alt="Decorative" /> */}

        <button
          type="submit"
          className="w-[514px] bg-gradient-to-r my-4 from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg"
          onClick={validateCode}
        >
          Continue
        </button>
      </div>
      <div className="text-center">
        <a
          href="#"
          className="text-sm text-blue-500 underline my-10 py-10 font-semibold"
        >
          Change authentication mode
        </a>

        <div className="">
          <img
            src={AdjiLogo}
            alt="Adij Logo"
            className=" mx-auto pt-[4rem]"
          />
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="w-1/2 pt-4 pr-3 ">
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
export default EmailVarification;
