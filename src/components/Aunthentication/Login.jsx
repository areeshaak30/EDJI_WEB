import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rightImage from "../../assets/images/right-image.png";
import logo from "../../assets/images/logo.png";
import ReactFlagsSelect from "react-flags-select";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mfaToken, setMfaToken] = useState("");
  const [authenticators, setAuthenticators] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    } else if (/\s/.test(email)) {
      setError("Email should not contain spaces!");
      return;
    } else if (!/^[^@]+@[^\s]+$/.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    try {
      // 1st API Call: Request token for login
      const res = await fetch("https://dev.edji.co/v1/auth/token", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          grantType: "password",
          userName: email,
        }),
      });
      const data = await res.json();
      console.log("First API response:", data);
      if (data.error === "mfa_required") {
        setMfaToken(data.mfaToken);
        // 2nd API call
        const authenticatorsRes = await fetch(
          "https://dev.edji.co/v1/mfa/authenticators",
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/JSON",
              Authorization: `Bearer ${data.mfaToken}`,
            },
          }
        );
        const authenticatorsData = await authenticatorsRes.json();
        console.log("Authenticators fetch response:", authenticatorsData);
        if (authenticatorsRes.ok) {
          if (authenticatorsData && authenticatorsData.length > 0) {
            setAuthenticators(authenticatorsData);
            const defaultAuthenticator = authenticatorsData.find(
              (auth) => auth.active
            );
            if (defaultAuthenticator) {
              // 3rd API Call
              await postMfaChallenge(defaultAuthenticator.id, data.mfaToken);
            } else {
              setError("No active authenticators found.");
            }
          } else {
            setError("No authenticators available.");
          }
        } else {
          setError("Failed to fetch Authenticators!");
        }
      } else {
        setError("Unexpected error during login.");
      }
    } catch (error) {
      console.error("Error during the API call:", error);
      setError("Network error or server error. Please try again.");
    }
  };

  // 3rd API def
  const postMfaChallenge = async (authenticatorId, mfaToken) => {
    try {
      const res = await fetch("https://dev.edji.co/v1/mfa/challenge?lang=heb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mfaToken}`,
        },
        body: JSON.stringify({
          challengeType: "oob",
          authenticatorId,
          mfaToken,
        }),
      });
      const data = await res.json();
      console.log("MFA Challenge Response:", data);
      const authcode = data.oobCode;
      console.log(authcode, "authcode now");
      console.log(authenticatorId)

      // Replace AsyncStorage with localStorage
      localStorage.setItem("mfaToken", mfaToken);
      localStorage.setItem("oobCode", authcode);

      if (res.ok) {
        navigate("/emailverification"); // Navigate to email verification page
      } else {
        const errorData = await res.json();
        setError("Failed to post MFA challenge.");
        console.log("Error posting MFA challenge:", errorData);
      }
    } catch (error) {
      setError("Error in MFA Challenge.");
      console.error("Error in MFA Challenge:", error);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-50 flex flex-col items-center mt-9">
        <img src={logo} alt="Logo" className="mb-6 w-39" />
        {/* Language Dropdown */}
        <div className="mt-10">
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => setSelected(code)}
            className="hover:bg-blue-100 rounded"
          />
        </div>

        {/* Login Form */}
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="flex justify-center text-sm font-medium text-gray-700 my-6"
          >
            Please enter your email to proceed
          </label>
          <div className="relative mb-4">
            <span>Email</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Zakholiver@gmail.com"
              value={email}
              onChange={handleInputChange}
              className={`w-full px-10 py-3 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />

            <span className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-400">
              📧
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg"
          >
            Continue
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-1/2 m-3">
        <img
          src={rightImage}
          alt="Decorative"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
