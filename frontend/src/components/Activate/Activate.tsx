import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type ActivateProps = {
  email: string;
};

function Activate(props: ActivateProps) {
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleVerification = () => {
    axios
      .post("http://[::1]:8000/verify", {
        verificationCode: verificationCode,
        email: props.email, 
      })
      .then((res) => {
        const { message } = res.data;
        if (message == "Verification successful") {
          navigate("/validate");
        } else {
          setError("Invalid verification code");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred during verification");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 1.5 }}
      className="bg-grey-lighter min-h-screen flex flex-col"
    >
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Activate</h1>
          <h3 className="mb-8 text-xl text-center"> {props.email}</h3>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={handleVerification}
            >
              Activate the account
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Activate;
